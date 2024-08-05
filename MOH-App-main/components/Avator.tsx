import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Image, Button, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import axios from "axios";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) {
      setAvatarUrl(url);
    }
  }, [url]);

  const uploadAvatar = async () => {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];
      if (!image.uri) {
        throw new Error("No image URI found!");
      }

      const formData = new FormData();
      formData.append("avatar", {
        uri: image.uri,
        name: "avatar.jpg",
        type: "image/jpeg",
      } as any);
      formData.append("userId", "your-user-id"); // Replace with actual user ID

      const response = await axios.post("http://localhost:3001/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.avatar_url) {
        setAvatarUrl(response.data.avatar_url);
        onUpload(response.data.avatar_url);
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      Alert.alert("Error", "Error uploading avatar. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} accessibilityLabel="Avatar" style={[avatarSize, styles.avatar, styles.image]} />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      <View style={styles.buttonContainer}>
        <Button title={uploading ? "Uploading ..." : "Upload"} onPress={uploadAvatar} disabled={uploading} />
        {uploading && <ActivityIndicator style={styles.loadingIndicator} size="small" color="#0000ff" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    resizeMode: "cover",
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  loadingIndicator: {
    marginTop: 10,
  },
});
