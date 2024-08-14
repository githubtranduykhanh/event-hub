import { View, Text, Button, Image, Switch, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import {AntDesign} from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles';
import { Lock1, Sms } from 'iconsax-react-native';
import {SocialLogin} from './components';
import ArrowRight from '../../../assets/svgs/arrow-right.svg'
import { apiLogin } from '../../apis';
interface Inputs {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}:any) => {

  const [inputs,setInput] =useState<Inputs>({
    email:'',
    password:'',
  })
  const [isRemember,setIsRemember] = useState(true)


  const handleLogin = async () =>{
    apiLogin()
    .then(response => console.log(response))
    .catch(error => {
      console.error('Error:', error);
      Alert.alert('Error', error);
    });
  }

  return (
   <ContainerComponent isImageBackground>
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
  )
}

export default LoginScreen