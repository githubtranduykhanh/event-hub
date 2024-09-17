import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigaror from './TabNavigaror'
import DrawerNavigator from './DrawerNavigator'
import { EventDetail } from '~/screens'
import { Host } from 'react-native-portalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import NotificationService from '~/services/NotificationService'
import { ApiHelper } from '~/apis/helper'
import { getFromStorage, saveToStorage } from '~/utils/storage'
import { UserSlice } from '~/redux/features/auth/authSlice'
import { apiPostExpoPushToken } from '~/apis'

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