import React, { useEffect } from "react";
import axios from "axios";
import { View, Button, Text } from "react-native";
import { Link, router } from "expo-router";

const IndexPage = () => {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/auth/session");
        if (data.session) {
          router.replace("/home");  // Simplified path
        } else {
          console.log("No user session found.");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    const handleAuthStateChange = async () => {
      try {
        const { data } = await axios.post("http://localhost:3001/auth/onAuthStateChange");
        if (data.session) {
          router.replace("/home");  // Simplified path
        } else {
          console.log("No user session found.");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error handling auth state change:", error);
      }
    };

    checkSession();
    handleAuthStateChange();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <View>
      <Text>Welcome to the app!</Text>
      <Button title="Go to Home" onPress={() => router.replace("/home")} />
      <Link href="/login">
        <Text>Login</Text>
      </Link>
    </View>
  );
};

export default IndexPage;
