import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen, } from './src/screens';
import { AuthNavigator, MainNavigator } from './src/navigators';
import { NavigationContainer } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function App() {

  const [isShowSplash,setIsShowSplash] = useState(true)
  const [assetToken,setAssetToken] = useState('')

  const {getItem,setItem} = useAsyncStorage('assetToken')
  useEffect(() => {
    checkLogin()
    const timeout = setTimeout(()=>{
      setIsShowSplash(false)
    },1500)

    return () => clearTimeout(timeout)
  },[])

  useEffect(() => {

  },[])

  const checkLogin = async () => {
    const token = await getItem()

    token && setAssetToken(token)
    console.log(token)
  }

  return (
   <>
      <StatusBar style='dark' translucent/>
      { isShowSplash 
      ? <SplashScreen/> 
      : <NavigationContainer>
        {assetToken ? <MainNavigator/> :  <AuthNavigator/>}     
      </NavigationContainer>}
   </>
  );
}

