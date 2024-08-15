import { View, Text, Button, Image, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import {AntDesign} from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles';
import { Lock1, Sms } from 'iconsax-react-native';
import {SocialLogin} from './components';
import ArrowRight from '../../../assets/svgs/arrow-right.svg'
import { apiLogin } from '../../apis';
import { Validate } from '~/utils/validate';
import { LoadingModal } from '~/modals';

interface Inputs {
  email: string;
  password: string;
}

interface Error {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}:any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputs,setInput] =useState<Inputs>({
    email:'',
    password:'',
  })

  const [errorInputs, setErrorInput] = useState<Error>({
    email: '',
    password: '',
  })

  const [isRemember,setIsRemember] = useState(true)


  useEffect(() => {
    setErrorInput({
      email: '',
      password: '',
    })
  }, [inputs])

  const handleLogin = () =>{

    const errors: Record<string, string> = {};

    if (inputs.email === '') errors.email = 'Email is required.'
    if (inputs.password === '') errors.password = 'Password is required.'
    
    if (!errors.email && !Validate.email(inputs.email)) {
      errors.email = 'Invalid email.';
    }
    if (!errors.password && !Validate.Password(inputs.password)) {
      errors.password = 'Password must be greater than 6 characters.';
    }
    
    if(Object.keys(errors).length > 0) {
      return setErrorInput(prev => ({ ...prev, ...errors }))
    }
  
    setIsLoading(true)
    apiLogin(inputs)
    .then(res => res.data)
    .then(res => {
      if (res.status) {
        console.log('=============')
        console.log("Res", res)
        Alert.alert("Successfully",res.mes)
      }else if (!res.status && res.errors && Object.keys(res.errors).length > 0){
        Alert.alert("Error",res.mes)
        setErrorInput(prve => ({ ...prve, ...res.errors }))
      }else{
        Alert.alert("Error",res.mes)
      }
    })
    .catch(error => {
      console.log('Error:', error?.response?.data?.mes || error.message || error);
      Alert.alert('Error', error?.response?.data?.mes || error.message || error);
    }).finally(()=>{
      setIsLoading(false)
    })
  }

  return (
   <>
    <LoadingModal visible={isLoading} />
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent styles={{
        justifyContent:'center',
        alignItems:'center',
        marginTop:31,
      }}>
      <Image style={{width:162,height:114}} source={require('../../../assets/images/logo.png')} resizeMode='cover' />
      </SectionComponent>
      <SpaceComponent height={10}/>
      <SectionComponent>
        <TextComponent text='Sign in' title/>
        <SpaceComponent height={21}/>
        <InputComponent      
            placeholder='abc@email.com'
            value={inputs.email} 
            onChange={(val: string)=> setInput(prve => ({...prve,email:val}))}
            isPassword={false}
            allowClear
            affix={<Sms size={22} color={colors.gray}/>}
            type='email-address'
            error={errorInputs.email}
          />
          <SpaceComponent height={19}/>
          <InputComponent 
            placeholder='Your password'
            value={inputs.password} 
            onChange={(val: string)=> setInput(prve => ({...prve,password:val}))}
            isPassword={true}
            allowClear         
            affix={<Lock1 size={22} color={colors.gray}/>}    
            error={errorInputs.password}    
          />
          <SpaceComponent height={20}/>
          <RowComponent justify='space-between'>
            <RowComponent onPress={() => setIsRemember(prve => !prve)}>            
              <Switch
                style={{marginRight:5}} 
                trackColor={{true:colors.primary}}
                thumbColor={colors.white}
                value={isRemember}
                onChange={() =>setIsRemember(prve => !prve)}
              />
              <TextComponent text='Remember Me'/>
            </RowComponent>
            
            <ButtonComponent text='Forgot password?' onPress={()=>navigation.navigate('ForgotPasswordScreen')} type='text' />
          </RowComponent>
      </SectionComponent>
 
      <SectionComponent styles={{marginTop:16,marginBottom:4}}>      
        <ButtonComponent 
        onPress={handleLogin}
        textStyle={{textAlign:'center',marginRight:0}}  
        iconFlex='right' 
        icon={<ArrowRight style={{position: 'absolute',right: 16}}  />} 
        text='SIGN IN' 
        type='primary' />
      </SectionComponent>
      <SocialLogin/>
      <SectionComponent>
        <RowComponent justify='center'>
          <TextComponent text='Don’t have an account?' style={{marginRight:5}} />
          <ButtonComponent text='Sign up' type='link' onPress={()=>navigation.navigate('SignUpScreen')}/>
          
        </RowComponent>
      </SectionComponent>
   </ContainerComponent>
   </>
  )
}

export default LoginScreen