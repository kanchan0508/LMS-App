import { View, Text } from 'react-native';
import OnboardingScreen from '@/screens/onboarding/onboarding.screen';

export default function OnboardingRoute() {
  try {
    console.log('Rendering onboarding route');
    return <OnboardingScreen />;
  } catch (error) {
    console.error('Onboarding error:', error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Failed to load onboarding</Text>
      </View>
    );
  }
}