import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join to Becodemy</Text>
      <Text style={styles.subtitle}>
        It's easier than your imagination!
      </Text>
      <View style={styles.socialButtons}>
        <Pressable style={styles.socialButton}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: windowWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight(250),
  },
  title: {
    fontSize: fontSizes.FONT35,
    fontFamily: "Poppins_700Bold",
    color: '#000',
    marginBottom: windowHeight(10),
  },
  subtitle: {
    fontSize: fontSizes.FONT17,
    fontFamily: "Poppins_300Light",
    color: '#333',
    marginBottom: windowHeight(20),
  },
  socialButtons: {
    flexDirection: 'row',
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