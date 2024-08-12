import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen, } from './src/screens';
import { AuthNavigator } from './src/navigators';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  const [isShowSplash,setShowSplash] = useState(true)

  useEffect(() => {

    const timeout = setTimeout(()=>{
      setShowSplash(false)
    },1500)

    return () => clearTimeout(timeout)
  },[])

  return (
    isShowSplash ? <SplashScreen/> : <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
  );
}

