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
        // console.log("Response data:", jsonData); // Log response data for debugging
        if (jsonData && jsonData.items) {
          setSearchResults(jsonData.items);
        } else {
          throw new Error("No search results found in response");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
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
              duration={1000} // Adjust animation duration as needed
            />
          ) : (
            <Image
              source={{
                uri:
                  item.pagemap &&
                  item.pagemap.cse_image &&
                  item.pagemap.cse_image.length > 0
                    ? item.pagemap.cse_image[0].src
                    : "YOUR_PLACEHOLDER_IMAGE_URL",
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
          data={[1, 2, 3]} // Provide temporary data for shimmer
          renderItem={() => (
            <ShimmerPlaceholder
              style={styles.shimmerPlaceholder}
              duration={1000} // Adjust animation duration as needed
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
    height: 70, // Adjust height to match your item height
    marginBottom: 10,
  },
});

export default HashTagScreen;

// import { RouteProp } from "@react-navigation/native";
// import React, { useEffect, useState } from "react";
// import { View, Text, ActivityIndicator } from "react-native";

// type RootStackParamList = {
//   HashTagScreen: {
//     hashtag: string;
//   };
// };

// type HashTagScreenRouteProp = RouteProp<RootStackParamList, "HashTagScreen">;

// type Props = {
//   route: HashTagScreenRouteProp;
// };

// const HashTagScreen: React.FC<Props> = ({ route }) => {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [searchResults, setSearchResults] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       try {
//         const apiKey = "AIzaSyANmNNpF5Ws_RgpwB0GB04Ucwc59zJbYlY";
//         const searchQuery = encodeURIComponent(route.params?.hashtag);
//         const response = await fetch(
//           `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=e745d53938ed149ce&q=${searchQuery}`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const jsonData = await response.json();
//         console.log("Response data:", jsonData); // Log response data for debugging
//         if (jsonData && jsonData.items) {
//           setSearchResults(jsonData.items);
//         } else {
//           throw new Error("No search results found in response");
//         }
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [route.params?.hashtag]);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="blue" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       {searchResults.length > 0 ? (
//         searchResults.map((result: any, index: number) => (
//           <Text key={index}>{result.title}</Text>
//         ))
//       ) : (
//         <Text>No search results found for this hashtag</Text>
//       )}
//     </View>
//   );
// };

// export default HashTagScreen;

// // HashTagScreen.tsx
// import React from "react";
// import { View, Text } from "react-native";
// import { RouteProp } from "@react-navigation/native";

// type RootStackParamList = {
//   HashTagScreen: {
//     hashtag: string;
//   };
// };

// type HashTagScreenRouteProp = RouteProp<RootStackParamList, "HashTagScreen">;

// type Props = {
//   route: HashTagScreenRouteProp;
// };

// const HashTagScreen: React.FC<Props> = ({ route }) => {
//   const hashtag = route.params?.hashtag;
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>{hashtag}</Text>
//     </View>
//   );
// };

// export default HashTagScreen;
