
import { ThemeProvider } from '@/context/theme.context';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  return (
    <ThemeProvider >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
