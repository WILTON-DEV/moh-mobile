import { Link, router } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import React from "react";
import { View, Button } from "react-native";

export default function IndexPage() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(tabs)/(drawer)/home");
      } else {
        console.log("no user");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)/(drawer)/home");
      } else {
        console.log("no user");
        router.replace("/(tabs)/(drawer)/home");
      }
    });
  }, []);
}
     