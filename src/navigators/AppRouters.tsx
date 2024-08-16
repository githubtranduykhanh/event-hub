import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import { addAuth } from '~/redux/features/auth/authSlice'
import { getFromStorage } from '~/utils/storage'

const AppRouters = () => {
    const dispatch = useDispatch<AppDispatch>()
   

    const { accessToken } = useSelector((state:RootState) => state.auth.user)

    useEffect(()=>{
        checkLogin()
    },[])

    const checkLogin = async () => {
        const storedUser = await getFromStorage('auth');
        console.log(storedUser)
        storedUser && dispatch(addAuth(storedUser))
    }

  return (
    <>
      {accessToken ? <MainNavigator/> :  <AuthNavigator/>}     
    </>
  )
}

export default AppRouters