import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'

const CustomTabBarButton = ({ children, ...props }: BottomTabBarButtonProps) => {
  return (
    <TouchableOpacity
       {...props}
    >
        {children}
    </TouchableOpacity>
  )
}

export default CustomTabBarButton