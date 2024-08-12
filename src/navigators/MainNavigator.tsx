import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigaror from './TabNavigaror'

const MainNavigator = () => {

    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Main' component={TabNavigaror}/>
    </Stack.Navigator>
  )
}

export default MainNavigator