import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthModalProps {
  onClose: () => void;
}

WebBrowser.maybeCompleteAuthSession();

export default function AuthModal({ onClose }: AuthModalProps) {
  const [userInfo, setUserInfo] = useState<any>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1098728948199-4gevdb7m5jkantvnk1dipu1h0fd4or44.apps.googleusercontent.com",
    iosClientId:
      "1098728948199-rme79mncl3mki5npag9m8uc3k4uu618d.apps.googleusercontent.com",
    webClientId:
      "1098728948199-nulnrlfll5mm6vsvjmr9vf69glptkkmn.apps.googleusercontent.com",
  });

  useEffect(() => {
    checkStoredUser();
  }, []);

  useEffect(() => {
    handleSignInResponse();
  }, [response]);

  /** ✅ Check if user is already signed in */
  const checkStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("userInfo");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading stored user:", error);
    }
  };

  /** ✅ Handle Google Sign-In response */
  const handleSignInResponse = async () => {
    if (response?.type === "success" && response.authentication) {
      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: {
              Authorization: `Bearer ${response.authentication.accessToken}`,
            },
          }
        );
        const user = await userInfoResponse.json();
        setUserInfo(user);
        await AsyncStorage.setItem("userInfo", JSON.stringify(user));
        console.log("User info:", user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  /** ✅ Logout Function */
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      setUserInfo(null);
      console.log("User signed out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join to Becodemy</Text>
      <Text style={styles.subtitle}>It's easier than your imagination!</Text>

      {userInfo ? (
        <View style={{ alignItems: "center", marginTop: windowHeight(20) }}>
          <Image
            source={{ uri: userInfo.picture }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          <Text style={{ fontSize: fontSizes.FONT17, fontWeight: "bold" }}>
            {userInfo.name}
          </Text>
          <Text style={{ fontSize: fontSizes.FONT14 }}>{userInfo.email}</Text>
          <Pressable
            style={styles.socialButton}
            onPress={handleLogout}
          >
            <Text style={{ color: "red", fontSize: fontSizes.FONT17 }}>
              Logout
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.socialButtons}>
          <Pressable
            style={styles.socialButton}
            onPress={() => promptAsync()}
            disabled={!request}
          >
            <Image
              source={require("@/assets/images/onboarding/google.png")}
              style={styles.socialIcon}
            />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Image
              source={require("@/assets/images/onboarding/github.png")}
              style={styles.socialIcon}
            />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Image
              source={require("@/assets/images/onboarding/apple.png")}
              style={styles.socialIcon}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: windowWidth(20),
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight(250),
  },
  title: {
    fontSize: fontSizes.FONT35,
    fontFamily: "Poppins_700Bold",
    color: "#000",
    marginBottom: windowHeight(10),
  },
  subtitle: {
    fontSize: fontSizes.FONT17,
    fontFamily: "Poppins_300Light",
    color: "#333",
    marginBottom: windowHeight(20),
  },
  socialButtons: {
    flexDirection: "row",
    gap: windowWidth(20),
  },
  socialButton: {
    padding: windowWidth(10),
  },
  socialIcon: {
    width: windowWidth(40),
    height: windowHeight(40),
    resizeMode: "contain",
  },
});
