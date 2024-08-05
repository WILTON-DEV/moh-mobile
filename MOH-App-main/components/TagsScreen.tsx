import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

interface HashTag {
  hashtag: string;
}

const TagsScreen = () => {
  const unepiURL =
    "https://www.health.go.ug/ministry/uganda-national-expanded-program-on-immunisation-unepi";
  const initialHashtags: HashTag[] = [
    { hashtag: "#EndMalaria" },
    { hashtag: "#RedEyesUG" },
    { hashtag: "#MaternalChildHealthUG" },
    { hashtag: "#InfantAndHealthUg" },
    { hashtag: "#FightCancerUg" },
    { hashtag: "#EndHIV" },
    { hashtag: "#MalariaFreeFutureUG" },
    { hashtag: "#MOHatWork" },
    { hashtag: "#YellowFeverFreeUG" },
    { hashtag: "#WorldMalariaDayUG" },
    { hashtag: "#EndTB" },
  ];

  const navigation = useNavigation();
  const [hashtags, setHashtags] = useState<HashTag[]>(initialHashtags);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHashtags();
  }, []);

  const fetchHashtags = async () => {
    try {
      const response = await axios.get("http://localhost:3001/hashtags");
      setHashtags(response.data);
    } catch (error) {
      console.error("Error fetching hashtags:", (error as Error).message);
    }
  };

  const filterHashtags = (query: string) => {
    const filteredHashtags = hashtags.filter((tag) =>
      tag.hashtag.toLowerCase().includes(query.toLowerCase())
    );
    setHashtags(filteredHashtags);
  };

  const handleSearch = () => {
    filterHashtags(searchQuery);
  };

  const handleTagPress = (tag: HashTag) => {
    // navigation.navigate("HashTagScreen", { hashtag: tag.hashtag });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trending Hashtags</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search hashtags..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={hashtags}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTagPress(item)}>
            <View style={styles.trendItem}>
              <Text style={styles.trendText}>{item.hashtag}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.hashtag}
        contentContainerStyle={styles.trendsContainer}
      />
      <TouchableOpacity style={styles.showMore}>
        <Text style={styles.showMoreText}>Show more</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 MINISTRY OF HEALTH</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  searchButton: {
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  trendsContainer: {
    paddingBottom: 20,
  },
  trendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  trendText: {
    fontSize: 16,
    color: "#333",
  },
  showMore: {
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginTop: 10,
  },
  showMoreText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "bold",
  },
});

export default TagsScreen;
