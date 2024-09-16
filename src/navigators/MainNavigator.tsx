import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigaror from './TabNavigaror'
import DrawerNavigator from './DrawerNavigator'
import { EventDetail } from '~/screens'
import { Host } from 'react-native-portalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const MainNavigator = () => {

    const Stack = createNativeStackNavigator()
  return (
    <GestureHandlerRootView>
      <Host>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Main' component={DrawerNavigator}/>
            </Stack.Navigator>
      </Host> 
    </GestureHandlerRootView>
  )
}

export default MainNavigator