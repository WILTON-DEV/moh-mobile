// UpdatedDashboard.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Dashboard = ({
  onNavigateToAnalytics,
  onNavigateToUserManagement,
  onNavigateToPostManagement,
}:any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <TouchableOpacity
        style={styles.sectionButton}
        onPress={onNavigateToAnalytics}>
        <Text style={styles.buttonText}>Analytics</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sectionButton}
        onPress={onNavigateToUserManagement}>
        <Text style={styles.buttonText}>User Management</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sectionButton}
        onPress={onNavigateToPostManagement}>
        <Text style={styles.buttonText}>Post Management</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  sectionButton: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Dashboard;
