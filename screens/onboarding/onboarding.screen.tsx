import React, { useState } from "react";
import { onBoardingSlides } from "@/configs/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Slide from "@/components/onboarding/Slide";
import Slider from "@/components/onboarding/Slider";
import { Text, View } from "react-native";


export default function OnboardingScreen() {
  try {
  const [index, setIndex] = useState(0);
  const prev = onBoardingSlides[index - 1];
  const next = onBoardingSlides[index + 1];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Slider
        key={index}
        index={index}
        setIndex={setIndex}
        prev={
          prev && (
            <Slide
              index={index - 1}
              setIndex={setIndex}
              slide={prev}
              totalSlides={onBoardingSlides.length}
            />
          )
        }
        next={
          next && (
            <Slide
              index={index + 1}
              setIndex={setIndex}
              slide={next}
              totalSlides={onBoardingSlides.length}
            />
          )
        }
      >
        <Slide
          slide={onBoardingSlides[index]}
          index={index}
          setIndex={setIndex}
          totalSlides={onBoardingSlides.length}
        />
      </Slider>
    </View>
  );
} catch (error) {
  console.error('OnboardingScreen error:', error);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text>Failed to load onboarding screen</Text>
    </View>
  );
}
}