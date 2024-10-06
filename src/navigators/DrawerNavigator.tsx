import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigaror from './TabNavigaror';
import { DrawerCustom } from '~/components';
import { EventDetail, EventSeeAll, SearchEvents } from '~/screens';

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={{
        headerShown:false,
        drawerPosition:'left'
        }} drawerContent={props => <DrawerCustom {...props} />}>
        <Drawer.Screen name="TabNavigaror" component={TabNavigaror} />
        <Drawer.Screen name='EventDetail' component={EventDetail} />
        <Drawer.Screen name='EventSeeAll' component={EventSeeAll} />
        <Drawer.Screen name='SearchEvents' component={SearchEvents}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator