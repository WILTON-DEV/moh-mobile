import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const HashTagScreen = ({ route }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const apiKey = "AIzaSyANmNNpF5Ws_RgpwB0GB04Ucwc59zJbYlY";
        const searchQuery = encodeURIComponent(route.params?.hashtag);
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=e745d53938ed149ce&q=${searchQuery}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        if (jsonData && jsonData.items) {
          setSearchResults(jsonData.items);
        } else {
          throw new Error("No search results found in response");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", (error as Error).message);
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [route.params?.hashtag]);

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const renderSearchResult = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.resultContainer}
        onPress={() => openLink(item.link)}
      >
        <View style={styles.imageContainer}>
          {isLoading ? (
            <ShimmerPlaceholder
              style={styles.image}
              duration={1000}
            />
          ) : (
            <Image
              source={{
                uri:
                  item.pagemap &&
                  item.pagemap.cse_image &&
                  item.pagemap.cse_image.length > 0
                    ? item.pagemap.cse_image[0].src
                    : "https://via.placeholder.com/50",
              }}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <FlatList
          data={[1, 2, 3]}
          renderItem={() => (
            <ShimmerPlaceholder
              style={styles.shimmerPlaceholder}
              duration={1000}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  imageContainer: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleBox: {
    width: "80%",
  },
  shimmerPlaceholder: {
    width: "100%",
    height: 70,
    marginBottom: 10,
  },
});

export default HashTagScreen;
