import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { onBoardingSlides } from '@/configs/constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const prev = onBoardingSlides[index - 1];
  const next = onBoardingSlides[index + 1];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({})