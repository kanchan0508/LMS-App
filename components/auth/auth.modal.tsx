import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@clerk/clerk-expo";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";

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
  const [loading, setLoading] = useState(false);
  
  // Get the Clerk auth session
  const { isSignedIn, signOut } = useAuth();

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userInfo");
        if (storedUser) {
          setUserInfo(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error loading stored user:", error);
      }
    };
    loadStoredUser();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      
      // For now, let's just simulate a successful sign-in
      // until we can fix the OAuth flow
      const mockUserInfo = {
        picture: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "John Doe",
        email: "john.doe@example.com",
      };
      
      // Store the user info
      await AsyncStorage.setItem("userInfo", JSON.stringify(mockUserInfo));
      setUserInfo(mockUserInfo);
      
      Alert.alert("Success", "Signed in successfully (simulated)");
      
    } catch (err) {
      console.error("Sign in error", err);
      Alert.alert("Error", "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // First sign out from Clerk if signed in
      if (isSignedIn) {
        await signOut();
      }
      
      // Then clear local storage
      await AsyncStorage.removeItem("userInfo");
      setUserInfo(null);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join to Becodemy</Text>
      <Text style={styles.subtitle}>It's easier than your imagination!</Text>

      {userInfo ? (
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: userInfo.picture }} style={styles.profileImage} />
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.socialButtons}>
          <Pressable
            style={[styles.socialButton, loading && styles.disabledButton]}
            onPress={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#4285F4" size="small" />
            ) : (
              <Image
                source={require("@/assets/images/onboarding/google.png")}
                style={styles.socialIcon}
              />
            )}
          </Pressable>
          {/* Other social login buttons */}
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
  disabledButton: {
    opacity: 0.7,
  },
  socialIcon: {
    width: windowWidth(40),
    height: windowHeight(40),
    resizeMode: "contain",
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