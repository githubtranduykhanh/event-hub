import { View, Text, Button, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import {AntDesign} from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles';
import { Lock1, Sms,Profile, ArrowLeft } from 'iconsax-react-native';
import {SocialLogin} from './components';
import ArrowRight from '../../../assets/svgs/arrow-right.svg'

interface Inputs {
  email: string;
  password: string;
  fullName:string;
  confirmPassword:string;
}

const SignUpScreen = ({navigation}:any) => {

  const [inputs,setInput] =useState<Inputs>({
    email:'',
    password:'',
    fullName:'',
    confirmPassword:''
  })
  

  return (
   <ContainerComponent isImageBackground isScroll back>
      <SpaceComponent height={7}/>
      <SectionComponent>
        <TextComponent text='Sign up' title />
        <SpaceComponent height={21}/>
          <InputComponent      
            placeholder='Full name'
            value={inputs.fullName} 
            onChange={(val: string)=> setInput(prve => ({...prve,fullName:val}))}
            isPassword={false}
            allowClear
            affix={<Profile size={22} color={colors.gray}/>}
            type='default'
          />
          <SpaceComponent height={19}/>
          <InputComponent      
            placeholder='abc@email.com'
            value={inputs.email} 
            onChange={(val: string)=> setInput(prve => ({...prve,email:val}))}
            isPassword={false}
            allowClear
            affix={<Sms size={22} color={colors.gray}/>}
            type='email-address'
          />
          <SpaceComponent height={19}/>
          <InputComponent 
            placeholder='Your password'
            value={inputs.password} 
            onChange={(val: string)=> setInput(prve => ({...prve,password:val}))}
            isPassword={true}
            allowClear         
            affix={<Lock1 size={22} color={colors.gray}/>}        
          />
          <SpaceComponent height={19}/>
          <InputComponent 
            placeholder='Confirm password'
            value={inputs.confirmPassword} 
            onChange={(val: string)=> setInput(prve => ({...prve,confirmPassword:val}))}
            isPassword={true}
            allowClear         
            affix={<Lock1 size={22} color={colors.gray}/>}        
          />
      </SectionComponent>
 
      <SectionComponent styles={{marginTop:16,marginBottom:4}}>
        <ButtonComponent 
        textStyle={{textAlign:'center',marginRight:0}}  
        iconFlex='right' 
        icon={<ArrowRight style={{position: 'absolute',right: 16}}  />} 
        text='SIGN UP' type='primary' />
      </SectionComponent>
      <SocialLogin/>
      <SectionComponent>
        <RowComponent justify='center'>
          <TextComponent text='Already have an account?' style={{marginRight:5}} />
          <ButtonComponent text='Sign in' type='link' onPress={() => navigation.navigate('LoginScreen')}/>
          
        </RowComponent>
      </SectionComponent>
   </ContainerComponent>
  )
}

export default SignUpScreen