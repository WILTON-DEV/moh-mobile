import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { supabase } from "../../../lib/supabase"; 
import FeedCard from "../../../components/FeedCard"; 
import TagsScreen from "../../../components/TagsScreen"; 
import HashTagScreen from "../../../components/HashTagScreen"; 

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (!hasMorePosts || isFetching) return;
    setIsFetching(true);
    setError(null);
    try {
      const { data, error }: { data: any[] | null; error: any } = await supabase
        .from("posts")
        .select("*")
        .range(page * 3 - 2, page * 3);
      if (error) {
        throw new Error(error.message);
      }
      const postsWithLocalPaths =
        data?.map((post) => ({
          ...post,
          imageLocalPath: post.image_url, // Assuming the image URL is stored in 'image_url' field
          profilePictureUrl: post.profile_picture_url, // Assuming the profile picture URL is stored in 'profile_picture_url' field
        })) || [];
      if (postsWithLocalPaths.length < 3) {
        setHasMorePosts(false);
      }
      // Append new posts to the existing list
      setPosts((prevPosts) => [...prevPosts, ...postsWithLocalPaths]);
      setPage((prevPage) => prevPage + 1);
    } catch (error: any) {
      setError(error.message as string);
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  const handleLoadMore = () => {
    fetchPosts();
  };

  const renderFooter = () => {
    if (isFetching && hasMorePosts) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View>
        <FeedCard items={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={posts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={renderFooter()}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
      />
    </View>
  );
};

const ProfilePicture = () => (
  <Image
    source={{ uri: 'https://avatars.githubusercontent.com/u/75447701?u=63da15b4009fc1c097bb53fbc9bd0aad35fbda7d&v=4' }} // Replace with your profile picture URL
    style={styles.profilePicture}
  />
);

const App = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        tabBarStyle: { paddingVertical: 10, backgroundColor: "white" },
        tabBarIndicatorStyle: { backgroundColor: "blue" },
        headerLeft: () => (
          <View style={styles.headerLeft}>
            <ProfilePicture />
          </View>
        ),
      })}
      tabBarPosition="top"
    >
      <Tab.Screen
        name="Feeds"
        component={HomeScreen}
        options={{ tabBarLabel: "Feeds" }}
      />
      <Tab.Screen
        name="Tags"
        component={TagsScreen}
        options={{ tabBarLabel: "Tags" }}
      />
      <Tab.Screen
        name="HashTagScreen"
        component={HashTagScreen}
        options={{ tabBarLabel: "HashTags" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
