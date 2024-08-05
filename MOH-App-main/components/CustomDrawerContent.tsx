import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Image, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export default function CustomDrawerContent(props: any) {
  const { top, bottom } = useSafeAreaInsets();

  const doLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3001/logout", {}, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      if (response.status === 200) {
        // Successfully logged out
        props.navigation.navigate("Login"); // Navigate to the login screen or any other appropriate screen
      } else {
        throw new Error("Failed to log out");
      }
    } catch (error) {
      Alert.alert("Logout Error", "Failed to log out. Please try again.");
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#dde3fe", height: "100%" }}
      >
        <View style={{ padding: 20 }}>
          <Image
            source={{
              uri: "https://avatars.githubusercontent.com/u/75447701?u=63da15b4009fc1c097bb53fbc9bd0aad35fbda7d&v=4",
            }}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "500",
              fontSize: 18,
              paddingTop: 10,
              color: "#5363df",
            }}
          >
            {" "}
            MINISTRY OF HEALTH
          </Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label={"Logout"} onPress={doLogout} />
      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      >
        <Text>Copyright 2024 Ministry of Health </Text>
      </View>
    </View>
  );
}
