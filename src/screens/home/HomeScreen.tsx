import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import { removeAuth } from '~/redux/features/auth/authSlice'
import { removeFromStorage } from '~/utils/storage'

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { fullName,email,role } = useSelector((state:RootState)=>state.auth.user)

  const handleLogout = async () =>{
    await removeFromStorage('auth')
    dispatch(removeAuth())
  }
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>HomeScreen</Text>
      <Text>{fullName}</Text>
      <Text>{email}</Text>
      <Text>{role}</Text>
      <Button title='Logout' onPress={handleLogout}/>
    </View>
  )
}

export default HomeScreen