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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";

interface Comment {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
  created_at: string;
}

interface FeedCardProps {
  title: string;
  username: string;
  created_at: string;
  content: string;
  imageLocalPath?: string;
  profilePictureUrl?: string;
  hashtags?: string[];
  onDeleteComment: (id: number) => void;
}

const FeedCard = ({ items }: any) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [showZoomModal, setShowZoomModal] = useState(false);

  useEffect(() => {
    setComments([]);
  }, []);

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;
    try {
      const newComment = {
        id: comments.length + 1,
        content: comment,
        user_id: 1,
        post_id: 1,
        created_at: new Date().toISOString(),
      };
      setComments([...comments, newComment]);
      setComment("");
    } catch (error: any) {
      console.error("Error adding comment:", (error as Error).message);
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

  function onDeleteComment(id: number): void {
    throw new Error("Function not implemented.");
  }

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
            resizeMode="contain" // Use contain to ensure the entire image is visible
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
            <TouchableOpacity onPress={() => onDeleteComment(commentData.id)}>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    marginBottom: 1, // Adjust as needed
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 3, // Adjust as needed
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
    marginBottom: 1, // Adjust as needed
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
