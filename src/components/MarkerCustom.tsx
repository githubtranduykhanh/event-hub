import { View, Text, ImageBackground } from 'react-native'
import React, { FC, ReactNode } from 'react'

interface Props {
    children :ReactNode;
}

const MarkerCustom:React.FC<Props> = ({children }) => {
  return (
    <ImageBackground source={require('../../assets/images/union.png')}
        style={{
            width:42,
            height:47,
            justifyContent:'center',
            alignItems:'center'
        }}
    >
        {children}
    </ImageBackground>
  )
}

export default MarkerCustom