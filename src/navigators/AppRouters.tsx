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
import { getFollowedEventUser } from '~/redux/features/auth/authActions'
import { ApiHelper } from '~/apis/helper'
import NotificationService from '~/services/NotificationService'
import { apiPostExpoPushToken } from '~/apis'
import { getCategoriesApp } from '~/redux/features/app/appActions'




const AppRouters = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user: { accessToken } } = useSelector((state: RootState) => state.auth)
  const [isShowSplash, setIsShowSplash] = useState(true)

  useEffect(() => {
    const notificationService = NotificationService.getInstance();
    (async () => {
      try {
        await checkLogin(notificationService)
      } catch (error) {
        console.log(ApiHelper.getMesErrorFromServer(error))
      }
      finally {
        setIsShowSplash(false)
      }
    })();



    notificationService.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    notificationService.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationService.removeListeners();
    };
  }, [])


  useEffect(()=>{
    if(accessToken) {
      dispatch(getFollowedEventUser())
      dispatch(getCategoriesApp())
    }
  },[accessToken])



  const checkLogin = async (notificationService: NotificationService) => {
    let storedUser = await getFromStorage('auth');
    const isRemember = await getFromStorage('isRemember');
    console.log('======================')
    console.log('Stored User: ', storedUser)
    console.log('======================')
    console.log('Is Remember:', isRemember)
    console.log('======================')
    if (!isRemember || !storedUser) return
    storedUser = storedUser as UserSlice

    const token = await notificationService.registerForPushNotificationsAsync();

    if (token && !storedUser.expoPushToken) {
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