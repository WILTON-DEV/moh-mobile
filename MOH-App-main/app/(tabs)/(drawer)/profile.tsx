import { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import React from "react";

export default function AddPost({ session }: { session: any }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const response = await axios.get(`http://your-api-endpoint/profiles/${session.user.id}`);
      const data = response.data;
      if (data) {
        setUsername(data.username);
        setImageUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    image_url,
  }: {
    username: string;
    image_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        image_url,
        updated_at: new Date(),
      };

      const response = await axios.put(`http://your-api-endpoint/profiles/${session.user.id}`, updates);

      if (response.status !== 200) {
        throw new Error("Error updating profile");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() => updateProfile({ username, image_url: imageUrl })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => axios.post("http://your-api-endpoint/auth/signout")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
