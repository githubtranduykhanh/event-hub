import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import { addAuth } from '~/redux/features/auth/authSlice'
import { getFromStorage } from '~/utils/storage'
import { SplashScreen } from '~/screens'
import { getFollowersUser } from '~/redux/features/auth/authActions'
import { ApiHelper } from '~/apis/helper'

const AppRouters = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user:{accessToken}} = useSelector((state:RootState) => state.auth)
    const [isShowSplash,setIsShowSplash] = useState(true)

    useEffect(() => {
        (async ()=>{
          try {
            await checkLogin()
          } catch (error) {
            console.log(ApiHelper.getMesErrorFromServer(error)) 
          }
          finally {
            setIsShowSplash(false)
          }
        })();
     /*  const timeout = setTimeout(()=>{
        setIsShowSplash(false)
      },1500)
  
      return () => clearTimeout(timeout) */
    },[])

    const checkLogin = async () => {
        const storedUser = await getFromStorage('auth');
        const isRemember = await getFromStorage('isRemember');
        console.log('======================')
        console.log('Stored User: ',storedUser)
        console.log('======================')
        console.log('Is Remember:',isRemember)
        console.log('======================')
        isRemember && storedUser &&  dispatch(addAuth(storedUser)) && dispatch(getFollowersUser())
    }

  return (
    <>
      {isShowSplash ? <SplashScreen/> :  accessToken ? <MainNavigator/> :  <AuthNavigator/>}     
    </>
  )
}

export default AppRouters