import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screens'

const TabNavigaror = () => {
    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='HomeScreen' component={HomeScreen}/>
    </Tab.Navigator>
  )
}

export default TabNavigaror