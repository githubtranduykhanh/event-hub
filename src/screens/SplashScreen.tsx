import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { appInfo, colors } from '../styles'

const SplashScreen = () => {
  return (
    <ImageBackground 
        source={require('../../assets/images/splash-screen.png')}
        style={{flex:1,justifyContent:'center',alignItems:'center'}}
        imageStyle={{flex:1}}
    >
        <Image 
            source={require('../../assets/images/logo-splash.png')}
            style={{width:appInfo.size.WIDTH * 0.8}}
            resizeMode='contain'
        />
        <ActivityIndicator color={colors.gray} size={22}/>
    </ImageBackground>
  )
}

export default SplashScreen