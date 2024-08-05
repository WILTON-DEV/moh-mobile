import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Image, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios, { AxiosError } from "axios"; // Import AxiosError from axios
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

  const flatListRef = useRef<FlatList<any> | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
    if (!hasMorePosts || isFetching) return;
    setIsFetching(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3001/posts`);
      const data = response.data;
      if (data.length < 3) {
        setHasMorePosts(false);
      }
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error: any) { // Handle error as any type
      setError(error.message); // TypeScript infers 'error' as any type here
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, [page, hasMorePosts, isFetching]);

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

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View>
        <FeedCard items={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.1}
          onEndReached={handleLoadMore}
        />
      )}
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
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        tabBarStyle: { paddingVertical: 10, backgroundColor: "white" },
        tabBarIndicatorStyle: { backgroundColor: "blue" },
      }}
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
  errorText: {
    textAlign: "center",
    color: "red",
    marginVertical: 20,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default App;
