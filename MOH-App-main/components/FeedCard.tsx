import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Share,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import axios from "axios";

interface Comment {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
  created_at: string;
}

interface FeedCardProps {
  items: {
    title: string;
    username: string;
    created_at: string;
    content: string;
    imageLocalPath?: string;
    profilePictureUrl?: string;
    hashtags?: string[];
  };
}

const FeedCard: React.FC<FeedCardProps> = ({ items }) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [showZoomModal, setShowZoomModal] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/comments/1`); // Adjust the post_id accordingly
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", (error as Error).message);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;
    try {
      const newComment = {
        content: comment,
        user_id: 1, // Use actual user ID
        post_id: 1, // Adjust the post_id accordingly
      };
      const response = await axios.post("http://localhost:3001/comments", newComment);
      setComments([...comments, response.data]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", (error as Error).message);
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/comments/${id}`);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete comment. Please try again.");
      console.error("Error deleting comment:", (error as Error).message);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${items.title}\n\n${items.content}\n\nImage: ${items.imageLocalPath}`,
      });
    } catch (error) {
      console.error("Error sharing:", (error as Error).message);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: items.profilePictureUrl }}
          style={styles.profilePicture}
        />
        <View style={styles.headerText}>
          <View style={styles.headerRow}>
            <Text style={styles.username}>{items.username}</Text>
            <Text style={styles.timeAgo}>{items.created_at}</Text>
          </View>
          <Text style={styles.title}>{items.title}</Text>
          <Text style={styles.content}>{items.content}</Text>
        </View>
      </View>
      {items.imageLocalPath && (
        <TouchableOpacity onPress={() => setShowZoomModal(true)}>
          <Image
            source={{ uri: items.imageLocalPath }}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => setShowZoomModal(true)}>
          <View style={styles.commentIconContainer}>
            <Ionicons name="chatbox-outline" size={24} color="blue" />
            <Text style={styles.commentCountText}>{comments.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-social-outline" size={24} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.commentsSection}>
        {comments.map((commentData) => (
          <View key={commentData.id} style={styles.commentItem}>
            <Text>{commentData.content}</Text>
            <TouchableOpacity onPress={() => handleDeleteComment(commentData.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write your request..."
          value={comment}
          onChangeText={setComment}
          onSubmitEditing={handleCommentSubmit}
        />
        <TouchableOpacity
          style={styles.commentButton}
          onPress={handleCommentSubmit}
        >
          <Text style={styles.commentButtonText}>Request for Details</Text>
        </TouchableOpacity>
      </View>

      {/* Zoom Image Modal */}
      {items.imageLocalPath && (
        <Modal
          visible={showZoomModal}
          transparent={true}
          onRequestClose={() => setShowZoomModal(false)}
        >
          <ImageViewer
            imageUrls={[{ url: items.imageLocalPath }]}
            enableSwipeDown={true}
            onSwipeDown={() => setShowZoomModal(false)}
          />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    // boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    top: 0,
  },
  headerText: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 3,
  },
  timeAgo: {
    color: "gray",
    fontSize: 12,
    position: "absolute",
    right: 10,
    top: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 1,
    position: "absolute",
    top: 0,
  },
  content: {
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 12,
  },
  commentsSection: {
    marginTop: 20,
  },
  commentIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentCountText: {
    marginLeft: 5,
  },
  commentItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  commentButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    color: "black",
    fontWeight: "bold",
  },
  hashtagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  hashtag: {
    color: "blue",
    marginRight: 5,
  },
});

export default FeedCard;
