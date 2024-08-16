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

const AppRouters = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { accessToken } = useSelector((state:RootState) => state.auth.user)
    const [isShowSplash,setIsShowSplash] = useState(true)

    useEffect(() => {
        checkLogin()
      const timeout = setTimeout(()=>{
        setIsShowSplash(false)
      },1500)
  
      return () => clearTimeout(timeout)
    },[])

 
    const checkLogin = async () => {
        const storedUser = await getFromStorage('auth');
        const isRemember = await getFromStorage('isRemember');
        console.log(storedUser)
        console.log(isRemember)
        isRemember && storedUser &&  dispatch(addAuth(storedUser))
    }

  return (
    <>
      {isShowSplash ? <SplashScreen/> :  accessToken ? <MainNavigator/> :  <AuthNavigator/>}     
    </>
  )
}

export default AppRouters