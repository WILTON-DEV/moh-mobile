import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Alert, ActivityIndicator, Image, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Import axios for making HTTP requests

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
    if (!result.canceled) {
      setImage(result.assets[0].uri); // Adjusted to access the URI correctly
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

      // Send the post data to your backend
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', {
        uri: image,
        type: 'image/jpeg', // Adjust this based on the image type you are sending
        name: 'image.jpg',
      } as any); // Type assertion

      const response = await axios.post('http://localhost:3001/api/v1/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Post updated successfully');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'An error occurred.');
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Content"
          value={content}
          onChangeText={(text) => setContent(text)}
          multiline
        />
        <View style={styles.hashtagContainer}>{renderHashtags()}</View>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Pick an image from camera roll</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <TouchableOpacity onPress={updatePost} style={styles.button} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Post'}</Text>
        </TouchableOpacity>
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
  input: {
    borderColor: '#000968',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
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
    backgroundColor: '#000968',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
