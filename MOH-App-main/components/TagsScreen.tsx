import React, { useState } from "react";
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
    { hashtag: "#End HIV" },
    { hashtag: "#MalariaFreeFutureUG" },
    { hashtag: "#MOHatWork" },
    { hashtag: "#YellowFeverFreeUG" },
    { hashtag: "#WorldMalariaDayUG" },
    { hashtag: "#End TB" },
  ];

  const navigation = useNavigation();

  const [hashtags, setHashtags] = useState<HashTag[]>(initialHashtags);
  const [searchQuery, setSearchQuery] = useState("");

  const filterHashtags = (query: string) => {
    const filteredHashtags = initialHashtags.filter((tag) =>
      tag.hashtag.toLowerCase().includes(query.toLowerCase())
    );
    setHashtags(filteredHashtags);
  };

  const handleSearch = () => {
    filterHashtags(searchQuery);
  };

  const handleTagPress = (tag: HashTag) => {
    navigation.navigate("HashTagScreen", { hashtag: tag.hashtag });
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




// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import { Linking } from "react-native";

// interface HashTag {
//   hashtag: string;
// }

// const TagsScreen = () => {
//   const unepiURL =
//     "https://www.health.go.ug/ministry/uganda-national-expanded-program-on-immunisation-unepi";
//   const UNEPI = unepiURL;
//   const initialHashtags: HashTag[] = [
//     {
//       hashtag: "#Node",
//     },
//     { hashtag: "javascript" },
//     { hashtag: "#reactnative" },
//     { hashtag: "#webdevelopment" },
//     { hashtag: "#coding" },
//     { hashtag: "#100DaysOfCode" },
//     { hashtag: "#programming" },
//     { hashtag: "#frontend" },
//     { hashtag: "#backend" },
//     { hashtag: "#opensource" },
//     { hashtag: "#devcommunity" },
//   ];

//   const navigation = useNavigation();

//   const [hashtags, setHashtags] = useState<HashTag[]>(initialHashtags);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filterHashtags = (query: string) => {
//     const filteredHashtags = initialHashtags.filter((tag) =>
//       tag.hashtag.toLowerCase().includes(query.toLowerCase())
//     );
//     setHashtags(filteredHashtags);
//   };

//   const handleSearch = () => {
//     filterHashtags(searchQuery);
//   };

//   const handleTagPress = (tag: HashTag) => {
//     // Navigate to the screen associated with the hashtag
//     navigation.navigate("HashTagScreen", { hashtag: tag.hashtag });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search to filter hashtags..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Ionicons name="search" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.trendsContainer}>
//         <FlatList
//           data={hashtags}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleTagPress(item)}>
//               <View style={styles.trendItem}>
//                 <Text style={styles.trendText}>{item.hashtag}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item) => item.hashtag}
//         />
//         <TouchableOpacity style={styles.showMore}>
//           <Text style={styles.showMoreText}>Show more</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>© 2024 MINISTRY OF HEALTH</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     marginBottom: 20,
//   },
//   searchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   searchButton: {
//     padding: 10,
//     backgroundColor: "#007bff",
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchInput: {
//     marginLeft: 10,
//     flex: 1,
//     fontSize: 16,
//   },
//   trendsContainer: {
//     marginBottom: 20,
//   },
//   trendsHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   trendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   trendText: {
//     fontSize: 16,
//     marginRight: 10,
//     color: "#007bff",
//   },
//   showMore: {
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//     paddingTop: 10,
//     alignItems: "center",
//   },
//   showMoreText: {
//     color: "#007bff",
//     fontWeight: "bold",
//   },
//   footer: {
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//     paddingVertical: 20,
//     alignItems: "center",
//   },
//   footerText: {
//     fontSize: 14,
//     color: "#999",
//     fontWeight: "bold",
//   },
// });

// export default TagsScreen;
