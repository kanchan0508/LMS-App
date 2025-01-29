import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function index() {
    const [LoggedInUser, setloggedInUser] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

    },[])
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}