import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

interface AuthModalProps {
  onClose: () => void;
}

interface UserInfo {
  picture: string;
  name: string;
  email: string;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1098728948199-4gevdb7m5jkantvnk1dipu1h0fd4or44.apps.googleusercontent.com",
    webClientId: "1098728948199-nulnrlfll5mm6vsvjmr9vf69glptkkmn.apps.googleusercontent.com",
    clientId: "1098728948199-nulnrlfll5mm6vsvjmr9vf69glptkkmn.apps.googleusercontent.com",
    responseType: "id_token",
    scopes: ['profile', 'email'],
    extraParams: {
      access_type: 'offline',
      prompt: 'select_account'
    }
  });

  useEffect(() => {
    handleSignInResponse();
  }, [response]);

  const handleSignInResponse = async () => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${response.authentication.accessToken}` }
          }
        );
        const user = await userInfoResponse.json();
        await AsyncStorage.setItem("userInfo", JSON.stringify(user));
        setUserInfo(user);
      } catch (error) {
        Alert.alert("Error", "Failed to get user info");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      setUserInfo(null);
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const user = await AsyncStorage.getItem("userInfo");
        if (user) {
          setUserInfo(JSON.parse(user));
        }
      } catch (error) {
        console.log("Error loading stored user");
      }
    };
    loadStoredUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join to Becodemy</Text>
      <Text style={styles.subtitle}>It's easier than your imagination!</Text>

      {userInfo ? (
        <View style={styles.userInfoContainer}>
          <Image
            source={{ uri: userInfo.picture }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
          <Pressable
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.socialButtons}>
          <Pressable
            style={[styles.socialButton, !request && styles.disabledButton]}
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
  disabledButton: {
    opacity: 0.6,
  },
  userInfoContainer: {
    alignItems: "center",
    marginTop: windowHeight(20),
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: windowHeight(10),
  },
  userName: {
    fontSize: fontSizes.FONT17,
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },
  userEmail: {
    fontSize: fontSizes.FONT14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  logoutButton: {
    marginTop: windowHeight(15),
    padding: windowWidth(10),
  },
  logoutText: {
    color: "red",
    fontSize: fontSizes.FONT17,
    fontFamily: "Poppins_500Medium",
  }
});
