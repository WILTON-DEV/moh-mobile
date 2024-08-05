import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Define a type for Ionicons name prop based on Ionicons key names
type IoniconsName = keyof typeof Ionicons.glyphMap;

function makeIconRender(name: IoniconsName) {
  return ({ color, size }: { color: string, size: number }) => (
    <Ionicons name={name} color={color} size={size} />
  );
}

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="(drawer)"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: makeIconRender("home"),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          tabBarLabel: "Post",
          tabBarIcon: makeIconRender("add-circle"),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
