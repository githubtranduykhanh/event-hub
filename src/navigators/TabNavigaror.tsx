import { View, Text, Platform } from 'react-native'
import React, { ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AddNewScreen, HomeScreen } from '../screens'
import ExploreNavigator from './ExploreNavigator'
import EventNavigator from './EventNavigator'
import MapNavigator from './MapNavigator'
import ProfileNavigator from './ProfileNavigator'
import { colors, globalStyles, typography } from '~/styles'
import { CircleComponent, TextComponent } from '~/components'
import {MaterialIcons} from '@expo/vector-icons';
import { AddSquare, Calendar, Location, Profile } from 'iconsax-react-native'


const TabNavigaror = () => {
    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator 
      screenOptions={({route}) => ({ 
        headerShown: false,
        tabBarStyle:{
          height:Platform.OS === 'ios' ? 88 : 68,
          justifyContent:'center',
          alignItems:'center',
        },
        tabBarIcon:(({focused,color,size}) => {
          let icon:ReactNode;
          color = focused ? colors.primary : colors.gray5
          size = 23
          switch (route.name) {
            case 'Explore':
                icon = <MaterialIcons name='explore' color={color} size={size}/>
              break;
            case 'Map':
                icon = <Location variant='Bold' color={color} size={size}/>
              break;
            case 'Events':
                icon = <Calendar variant='Bold' color={color} size={size}/>
              break;
            case 'Profile':
                icon = <Profile variant='Bold' color={color} size={size}/>
              break;
            case 'Add':
                icon = <CircleComponent size={52} styles={[{ 
                  marginBottom:Platform.OS === 'ios' ? '80%' : '90%'
                }]}>
                  <AddSquare size={24} color={colors.white} variant='Bold'/>
                </CircleComponent>
              break;
            default:
              break;
          }
          return icon
        }),
        tabBarIconStyle:{
          marginTop:8
        },
        tabBarLabel:(({focused}) => route.name === 'Add' ? null :  (<TextComponent 
            text={route.name} 
            size={12} 
            color={focused ? colors.primary : colors.gray5}
            style={{
              marginBottom: Platform.OS === 'android' ? 12 : 0
            }}
        />)),
      })}
    >     
        <Tab.Screen name='Explore' component={ExploreNavigator}/>
        <Tab.Screen name='Events' component={EventNavigator}/>
        <Tab.Screen name='Add' component={AddNewScreen}/>
        <Tab.Screen name='Map' component={MapNavigator} 
          options={({ route }) => ({
            tabBarStyle: {
              display: route.name === 'Map' ? 'none' : 'flex',
            },
          })}
        />
        <Tab.Screen name='Profile' component={ProfileNavigator}/>
    </Tab.Navigator>
  )
}

export default TabNavigaror