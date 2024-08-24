import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigaror from './TabNavigaror';
import { DrawerCustom } from '~/components';

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={{
        headerShown:false,
        drawerPosition:'left'
        }} drawerContent={props => <DrawerCustom {...props} />}>
        <Drawer.Screen name="TabNavigaror" component={TabNavigaror} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator