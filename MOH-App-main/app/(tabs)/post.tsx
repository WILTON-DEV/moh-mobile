import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AddPost from "../../components/Post";
interface Post {
  id: string;
  // Add other properties of your post object here
}

interface PageProps {
  onAddPost: (newPost: Post) => void;
}

const Page: React.FC<PageProps> = () => {
  return (
    <View>
      <AddPost />
    </View>
  );
};

export default Page;
