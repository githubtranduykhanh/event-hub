import { useFonts } from 'expo-font';
import * as SplashScreenEX from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SplashScreen, } from './src/screens';
import { AppRouters, AuthNavigator, MainNavigator } from './src/navigators';
import { NavigationContainer } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { typography } from './src/styles';
import { Provider } from 'react-redux';
import { store } from '~/redux/store';

SplashScreenEX.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    [typography.fontFamily.regular]: require('./assets/fonts/AirbnbCereal_W_Lt.otf'),
    [typography.fontFamily.medium]: require('./assets/fonts/AirbnbCereal_W_Md.otf'),
    [typography.fontFamily.semiBold]: require('./assets/fonts/AirbnbCereal_W_Bd.otf'),
    [typography.fontFamily.bold]: require('./assets/fonts/AirbnbCereal_W_XBd.otf'),
  });
  

  useEffect(() => {
    if (loaded || error) {
      SplashScreenEX.hideAsync();
    }
  }, [loaded, error]);

 

  if (!loaded && !error) {
    return <ActivityIndicator />;
  }

  return (
   <>
      <StatusBar style='dark' translucent/>
      <Provider store={store}>
        <NavigationContainer>
              <AppRouters/> 
        </NavigationContainer>
      </Provider>      
   </>
  );
}

