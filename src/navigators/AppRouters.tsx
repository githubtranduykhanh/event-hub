import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import { addAuth, UserSlice } from '~/redux/features/auth/authSlice'
import { getFromStorage, saveToStorage } from '~/utils/storage'
import { SplashScreen } from '~/screens'
import { getDataDefaultUser } from '~/redux/features/auth/authActions'
import { ApiHelper } from '~/apis/helper'
import NotificationService from '~/services/NotificationService'
import { apiGetEventById, apiPostExpoPushToken } from '~/apis'
import { getCategoriesApp } from '~/redux/features/app/appActions'
import { useNavigation } from '@react-navigation/native'
import { NotificationResponse } from 'expo-notifications'




const AppRouters = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation: any = useNavigation()
  const { user: { accessToken } } = useSelector((state: RootState) => state.auth)
  const [isShowSplash, setIsShowSplash] = useState(true)
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
   
    (async () => {
      try {
        await checkLogin(notificationService)
        const lastResponse = await notificationService.getLastNotificationResponseAsync();
        if (lastResponse) handleNotificationResponse(lastResponse)
      } catch (error) {
        console.log(ApiHelper.getMesErrorFromServer(error))
      }
      finally {
        setIsShowSplash(false)
      }
    })();



    notificationService.addNotificationReceivedListener(notification => {
      console.log('Notification received while app is open:', notification);
    });

    notificationService.addNotificationResponseReceivedListener(response => handleNotificationResponse(response));
    

    return () => {
      notificationService.removeListeners();
    };
  }, [])




  useEffect(()=>{
    if(accessToken) {
      dispatch(getDataDefaultUser())
      dispatch(getCategoriesApp())
      checkExpoPushToken(notificationService)
    }
  },[accessToken])


  const handleNotificationResponse = (response:NotificationResponse) =>{
    console.log('Notification response received:', response);
    const idEvent = response.notification.request.content.data.idEvent;
    if (idEvent) {
      apiGetEventById(idEvent)
        .then((res) => res.data)
        .then((data) => {
          if (data.status && data.data) {
            navigation.navigate('EventDetail', { item: data.data });
          } else {
            console.log(data.mes);
          }
        })
        .catch((err) => console.log(ApiHelper.getMesErrorFromServer(err)));
    }
  }

  const checkExpoPushToken = async (notificationService: NotificationService) => {
    const storedUser = await getFromStorage('auth');
    const token = await notificationService.registerForPushNotificationsAsync();
    if(token && (!storedUser.expoPushToken || storedUser.expoPushToken != token)){
        apiPostExpoPushToken({ expoPushToken: token })
        .then(res => res.data)
        .then(async (data) => {
          if (data.status) {
            storedUser.expoPushToken = token
            await saveToStorage('auth', storedUser)
            dispatch(addAuth(storedUser))
          }
        }).catch((err) => console.log(ApiHelper.getMesErrorFromServer(err)))
      
    }
  } 

  const checkLogin = async (notificationService: NotificationService) => {
    let storedUser = await getFromStorage('auth');
    const isRemember = await getFromStorage('isRemember');
    console.log('======================')
    console.log('Stored User: ', storedUser)
    console.log('======================')
    if (!isRemember || !storedUser) return
    storedUser = storedUser as UserSlice
    const token = await notificationService.registerForPushNotificationsAsync();
    if(token && (!storedUser.expoPushToken || storedUser.expoPushToken != token)){
        apiPostExpoPushToken({ expoPushToken: token })
        .then(res => res.data)
        .then(async (data) => {
          if (data.status) {
            storedUser.expoPushToken = token
            await saveToStorage('auth', storedUser)
          }
        }).catch((err) => console.log(ApiHelper.getMesErrorFromServer(err)))
    }
   
    dispatch(addAuth(storedUser))
  }
  
  return (
    <>
      {isShowSplash ? <SplashScreen /> : accessToken ? <MainNavigator /> : <AuthNavigator />}
    </>
  )
}

export default AppRouters