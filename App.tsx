import { useFonts } from 'expo-font';
import * as SplashScreenEX from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SplashScreen, } from './src/screens';
import { AuthNavigator, MainNavigator } from './src/navigators';
import { NavigationContainer } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { typography } from './src/styles';

SplashScreenEX.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    [typography.fontFamily.bold]: require('./assets/fonts/AirbnbCereal_W_XBd.otf'),
    [typography.fontFamily.medium]: require('./assets/fonts/AirbnbCereal_W_Md.otf'),
    [typography.fontFamily.semiBold]: require('./assets/fonts/AirbnbCereal_W_Bd.otf'),
    [typography.fontFamily.bold]: require('./assets/fonts/AirbnbCereal_W_Lt.otf'),
  });
  const [isShowSplash,setIsShowSplash] = useState(true)
  const [assetToken,setAssetToken] = useState('')

  const {getItem,setItem} = useAsyncStorage('assetToken')

  useEffect(() => {
    if (loaded || error) {
      SplashScreenEX.hideAsync();
    }
  }, [loaded, error]);

  

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

  if (!loaded && !error) {
    return <ActivityIndicator />;
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

