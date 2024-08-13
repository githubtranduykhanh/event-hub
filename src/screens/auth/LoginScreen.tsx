import { View, Text, Button, Image } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, InputComponent, SpaceComponent, TextComponent } from '../../components'
import {AntDesign} from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles';
import { Lock1, Sms } from 'iconsax-react-native';

interface Inputs {
  email: string;
  password: string;
}

const LoginScreen = () => {

  const [inputs,setInput] =useState<Inputs>({
    email:'',
    password:'',
  })


  return (
    <View 
    style={
      [globalStyles.container,
      {justifyContent:'center',alignItems:'center',padding:30}
      ]}>
      <Image source={require('../../../assets/images/logo.png')} resizeMode='cover' />
      <SpaceComponent height={12} />
      <TextComponent text='Sign in' title style={{alignSelf:'flex-start'}}/>
      <SpaceComponent height={20} />
      <InputComponent      
          placeholder='abc@email.com'
          value={inputs.email} 
          onChange={(val: string)=> setInput(prve => ({...prve,email:val}))}
          isPassword={false}
          allowClear
          affix={<Sms size={22} color={colors.gray}/>}
          type='email-address'
        />
        <SpaceComponent height={19} />
        <InputComponent 
          placeholder='Your password'
          value={inputs.password} 
          onChange={(val: string)=> setInput(prve => ({...prve,password:val}))}
          isPassword={true}
          allowClear         
          affix={<Lock1 size={22} color={colors.gray}/>}        
        />
    </View>
  )
}

export default LoginScreen