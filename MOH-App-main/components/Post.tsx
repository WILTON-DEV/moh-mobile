// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   View,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Image,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { supabase } from "../lib/supabase";
// import { Input } from "react-native-elements";
// import * as ImagePicker from "expo-image-picker";
// import { decode  } from "base-64";

// export default function AddPost() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [hashtags, setHashtags] = useState<string[]>([]);

//   useEffect(() => {
//     extractHashtags(content);
//   }, [content]);

//   const extractHashtags = (text: string) => {
//     const regex = /#(\w+(?:\s+\w+)*)/g;
//     const matches = text.match(regex);
//     if (matches) {
//       const uniqueHashtags = Array.from(new Set(matches));
//       setHashtags(uniqueHashtags);
//     } else {
//       setHashtags([]);
//     }
//   };

//   const requestCameraRollPermission = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert(
//         "Permission required",
//         "Please grant permission to access the camera roll."
//       );
//       return false;
//     }
//     return true;
//   };

//   const pickImage = async () => {
//     const hasPermission = await requestCameraRollPermission();
//     if (!hasPermission) return;

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: false,
//       aspect: [4, 3],
//       quality: 0.7,
//       base64: true,
//     });

//     if (result.canceled) return;

//     try {
//       setLoading(true);

//       const fileExtension = result.assets[0].uri.split(".").pop(); // Get file extension
//       const fileName = `${Date.now()}.${fileExtension}`;
//       // const response = await fetch(result.assets[0].uri);
//       // const blob = await response.blob();

//       // const { data, error } = await supabase.storage
//       //   .from("avatars")
//       //   .upload(fileName,  result.assets[0].uri, {
//       //     contentType: `image/${fileExtension}`,
//       //   });
//       const { data, error } = await supabase.storage
//         .from("avatars")
//         .upload(fileName, decode("base64FileData"), {
//           contentType: `image/${fileExtension}`,
//         });

//       if (error) {
//         throw new Error(error.message);
//       }

//       console.log("Uploaded data:", data);

//       // Get the public URL
//       const { data: publicUrlData, error: publicUrlError } = supabase.storage
//         .from("avatars")
//         .getPublicUrl(data.path);

//       if (publicUrlError) {
//         throw new Error(publicUrlError.message);
//       }

//       console.log("Public URL data:", publicUrlData);
//       setImage(publicUrlData.publicUrl);
//     } catch (error) {
//       Alert.alert("Error", error.message || "Failed to upload image");
//       console.error("Error uploading image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHashtagPress = (tag: string) => {
//     console.log("Hashtag pressed:", tag);
//   };

//   const renderHashtags = () => {
//     return hashtags.map((tag, index) => (
//       <TouchableOpacity key={index} onPress={() => handleHashtagPress(tag)}>
//         <Text style={styles.hashtag}>{tag}</Text>
//       </TouchableOpacity>
//     ));
//   };

//   const updatePost = async () => {
//     try {
//       setLoading(true);
//       if (!title.trim() || !content.trim() || !image) {
//         throw new Error("Title, content, and image are required.");
//       }
//       const { error } = await supabase.from("posts").upsert({
//         title,
//         content,
//         image_url: image,
//         created_at: new Date(),
//       });
//       if (error) {
//         throw new Error(error.message);
//       }
//       Alert.alert("Success", "Post updated successfully");
//     } catch (error) {
//       Alert.alert("Error", error?.message || "An error occurred.");
//       console.error("Error updating post:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewContent}>
//       <View style={styles.container}>
//         <Input
//           label="Title"
//           value={title}
//           onChangeText={(text) => setTitle(text)}
//           containerStyle={styles.inputContainer}
//         />
//         <Input
//           label="Content"
//           value={content}
//           onChangeText={(text) => setContent(text)}
//           containerStyle={styles.inputContainer}
//         />
//         <View style={styles.hashtagContainer}>{renderHashtags()}</View>
//         <Button title="Pick an image from camera roll" onPress={pickImage} />
//         {image && <Image source={{ uri: image }} style={styles.image} />}
//         <Button
//           title={loading ? "Loading..." : "Post"}
//           onPress={updatePost}
//           disabled={loading}
//           style={styles.button}
//         />
//         {loading && (
//           <ActivityIndicator
//             style={styles.loadingIndicator}
//             size="large"
//             color="#0000ff"
//           />
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollViewContent: {
//     flexGrow: 1,
//   },
//   container: {
//     marginTop: 40,
//     padding: 12,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     resizeMode: "cover",
//     marginBottom: 20,
//   },
//   hashtagContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 10,
//   },
//   hashtag: {
//     color: "blue",
//     marginRight: 5,
//   },
//   button: {
//     marginBottom: 20,
//   },
//   loadingIndicator: {
//     marginTop: 20,
//   },
// });



import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Alert, ActivityIndicator, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);

  useEffect(() => {
    extractHashtags(content);
  }, [content]);

  const extractHashtags = (text: string) => {
    const regex = /#(\w+(?:\s+\w+)*)/g;
    const matches = text.match(regex);
    if (matches) {
      const uniqueHashtags = Array.from(new Set(matches));
      setHashtags(uniqueHashtags);
    } else {
      setHashtags([]);
    }
  };

  const requestCameraRollPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant permission to access the camera roll.');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestCameraRollPermission();
    if (!hasPermission) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: undefined,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleHashtagPress = (tag: string) => {
    console.log('Hashtag pressed:', tag);
  };

  const renderHashtags = () => {
    return hashtags.map((tag, index) => (
      <TouchableOpacity key={index} onPress={() => handleHashtagPress(tag)}>
        <Text style={styles.hashtag}>{tag}</Text>
      </TouchableOpacity>
    ));
  };

  const updatePost = async () => {
    try {
      setLoading(true);
      if (!title.trim() || !content.trim() || !image) {
        throw new Error('Title, content, and image are required.');
      }
      const { error } = await supabase.from('posts').upsert({
        title,
        content,
        image_url: image,
        created_at: new Date(),
      });
      if (error) {
        throw new Error(error.message);
      }
      Alert.alert('Success', 'Post updated successfully');
    } catch (error) {
      Alert.alert('Error', error?.message || 'An error occurred.');
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Input
          label="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          containerStyle={styles.inputContainer}
        />
        <Input
          label="Content"
          value={content}
          onChangeText={(text) => setContent(text)}
          containerStyle={styles.inputContainer}
        />
        <View style={styles.hashtagContainer}>{renderHashtags()}</View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button title={loading ? 'Loading...' : 'Post'} onPress={updatePost} disabled={loading} style={styles.button} />
        {loading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    marginTop: 40,
    padding: 12,
  },
  inputContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  hashtag: {
    color: 'blue',
    marginRight: 5,
  },
  button: {
    marginBottom: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
