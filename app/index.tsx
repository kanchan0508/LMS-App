import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { Redirect } from 'expo-router';

export default function index() {
    const [loggedInUser, setloggedInUser] = useState(false);
    const [loading, setLoading] = useState(true); // Set initial loading to true

    useEffect(() => {
     
      const subscription = async () => {
        try {
          const token = await SecureStore.getItem("accessToken");
          console.log('Token:', token);
          setloggedInUser(token ? true : false);
        } catch (error) {
          console.error('SecureStore error:', error);
        } finally {
          setLoading(false); // Set loading to false when done
        }
      };
      subscription();
    }, []);

    console.log('Rendering, loggedInUser:', loggedInUser, 'loading:', loading);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
    }

    const redirectPath = !loggedInUser ? "/(routes)/onboarding" : "/(tabs)/index";
 
    
    return <Redirect href={redirectPath} />;
}