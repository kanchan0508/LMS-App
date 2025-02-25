import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  Modal,
  Alert, // Add this for debugging
} from "react-native";
import React, { useState } from "react";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";
import { HEIGHT, WIDTH } from "@/configs/constants";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import {
  fontSizes,
  SCREEN_WIDTH,
  windowHeight,
  windowWidth,
} from "@/themes/app.constant";
import { LinearGradient } from "expo-linear-gradient";
import AuthModal from "../auth/auth.modal";

export default function Slide({
  slide,
  index,
  setIndex,
  totalSlides,
}: {
  slide: onBoardingSlidesTypes;
  index: number;
  setIndex: (value: number) => void;
  totalSlides: number;
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    if (index === totalSlides - 1) {
      console.log('Last slide, opening modal');
      setModalVisible(true);
    } else {
      console.log('Moving to next slide');
      setIndex(index + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={slide.color} />
            <Stop offset="100%" stopColor={slide.color} />
          </RadialGradient>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill={"url(#gradient)"}
        />
      </Svg>
      <View style={styles.container}>
        <View>{slide.image}</View>
        <View>
          <View
            style={{
              width: SCREEN_WIDTH * 1,
              paddingHorizontal: verticalScale(25),
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT30,
                fontWeight: "600",
                color: "#05030D",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {slide.title}
            </Text>
            <Text
              style={{
                fontSize: fontSizes.FONT30,
                fontWeight: "600",
                color: "#05030D",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {slide.secondTitle}
            </Text>
            <Text
              style={{
                paddingVertical: verticalScale(4),
                fontSize: fontSizes.FONT18,
                color: "#3E3B54",
                fontFamily: "Poppins_300Light",
              }}
            >
              {slide.subTitle}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.indicatorContainer}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.indicator, i === index && styles.activeIndicator]}
          />
        ))}
      </View>
      <LinearGradient
        colors={["#6D55FE", "#8976FC"]}
        style={styles.nextButton}
      >
        <Pressable
          style={styles.buttonContent}
          onPress={handlePress}
        >
          <Text style={styles.nextButtonText}>
            {index === totalSlides - 1 ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </LinearGradient>

      {/* Modal */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <Pressable 
    style={styles.modalOverlay}
    onPress={() => setModalVisible(false)} // Close on overlay press
  >
    <Pressable 
      style={styles.modalContent}
      onPress={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
    >
      <AuthModal onClose={() => setModalVisible(false)} />
    </Pressable>
  </Pressable>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: scale(60),
    paddingTop: verticalScale(100),
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  nextButton: {
    position: "absolute",
    zIndex: 999999999,
    right: windowWidth(25),
    bottom: windowHeight(50),
    marginTop: windowHeight(30),
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth(140),
    height: windowHeight(37),
    borderRadius: windowWidth(20),
  },
  nextButtonText: {
    color: "white",
    fontSize: fontSizes.FONT22,
    fontFamily: "Poppins_600SemiBold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: windowWidth(420),
    backgroundColor: 'white',
    borderRadius: 30,
    overflow: 'hidden',
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: verticalScale(35),
    position: "absolute",
    bottom: verticalScale(55),
    left: scale(22),
  },
  indicator: {
    height: verticalScale(7),
    width: scale(18),
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: scale(4),
    borderRadius: scale(4),
  },
  activeIndicator: {
    height: verticalScale(7),
    width: scale(35),
    backgroundColor: "white",
  },
});