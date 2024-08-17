import { View, Text, Button, Image, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { AntDesign } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles';
import { Lock1, Sms, Profile, ArrowLeft } from 'iconsax-react-native';
import { SocialLogin } from '~/screens/auth/components';
import ArrowRight from '../../../assets/svgs/arrow-right.svg'
import { apiRegister, apiVerification } from '~/apis';
import { LoadingModal } from '~/modals';
import { Validate } from '~/utils/validate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/redux/store';
import { registerUser } from '~/redux/features/auth/authActions';
import { TextHelper } from '~/utils/text';


interface Inputs {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
}


interface Error {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
}

const SignUpScreen = ({ navigation }: any) => {
  
  

  const [disable, setDisable] = useState<boolean>(true)


  const [isLoadingVerication, setIsLoadingVerication] = useState<boolean>(false)

  const [inputs, setInput] = useState<Inputs>({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  })

  const [errorInputs, setErrorInput] = useState<Error>({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  })

 
 

  useEffect(() => {
    setErrorInput({
      email: '',
      password: '',
      fullName: '',
      confirmPassword: ''
    })
   
  }, [inputs])


  useEffect(() => {
    setDisable(Object.values(errorInputs).some((val) => val !== '') || Object.values(inputs).some(val => val.trim() === ''))
  },[errorInputs])

  const validateOnEnd = (val:string,name:string) => {

      if(val.trim() === ''){
        setErrorInput(prevErrors => ({ ...prevErrors, [name]: `${TextHelper.capitalizeFirstLetter(name)} is required.` }))
        return
      }

      if(name === 'email') !Validate.email(val) && setErrorInput(prev => ({ ...prev,email:'Invalid email.'}))
      else if(name === 'password') !Validate.Password(val) && setErrorInput(prev => ({ ...prev,password:'Password must be greater than 6 characters.'}))
      else if(name === 'confirmPassword') !Validate.ConfirmPassword(inputs.password,val)  && setErrorInput(prev => ({ ...prev,confirmPassword:'Password confirmation must match the password.'}))
      
  }

  const validateEmpty = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (inputs.fullName === '') errors.fullName = 'Full Name is required.';
    if (inputs.email === '') errors.email = 'Email is required.';
    if (inputs.password === '') errors.password = 'Password is required.';
    if (inputs.confirmPassword === '') errors.confirmPassword = 'Confirm Password is required.';

    setErrorInput(prev => ({ ...prev, ...errors }));
    return errors;
  }

  const validateType = (emptyErrors: Record<string, string>): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!emptyErrors.email && !Validate.email(inputs.email)) {
      errors.email = 'Invalid email.';
    }
    if (!emptyErrors.password && !Validate.Password(inputs.password)) {
      errors.password = 'Password must be greater than 6 characters.';
    }
    if (!emptyErrors.confirmPassword && !Validate.ConfirmPassword(inputs.password, inputs.confirmPassword)) {
      errors.confirmPassword = 'Password confirmation must match the password.';
    }

    setErrorInput(prev => ({ ...prev, ...errors }));

    return errors;
  }

  const handleRegister = () => {
    // Kiểm tra lỗi xác thực
    const emptyErrors = validateEmpty();
    const typeErrors = validateType(emptyErrors)
    if (Object.keys(emptyErrors).length !== 0 || Object.keys(typeErrors).length !== 0) return

    setIsLoadingVerication(true)
    apiVerification({email:inputs.email})
    .then(res => res.data)
    .then(data => {
      data.status ? navigation.navigate('VericationScreen',{...inputs,numbers:data.numbers}) : Alert.alert('Error',data.mes)
    })
    .catch(error => {
      if (error.response && error.response.data) {
        console.log(error.response.data.mes) 
        Alert.alert('Error',error.response.data.mes) 
      } else {
        console.log({ message: 'An unknown error has occurred' })
      }
    })
    .finally(()=> setIsLoadingVerication(false))
    // dispatch(registerUser(inputs))
  }

  return (
    <>
      
      <LoadingModal visible={isLoadingVerication} />
      <ContainerComponent isImageBackground isScroll back>
        <SpaceComponent height={7} />
        <SectionComponent>
          <TextComponent text='Sign up' title />
          <SpaceComponent height={21} />
          <InputComponent
            placeholder='Full name'
            value={inputs.fullName}
            onChange={(val: string) => setInput(prve => ({ ...prve, fullName: val }))}
            isPassword={false}
            allowClear
            affix={<Profile size={22} color={colors.gray} />}
            type='default'
            error={errorInputs.fullName}
            onEnd={(e) => e.nativeEvent.text === '' && setErrorInput(prve => ({...prve,fullName:'Full Name is required.'}))}
          />
          <SpaceComponent height={19} />
          <InputComponent
            placeholder='abc@email.com'
            value={inputs.email}
            onChange={(val: string) => setInput(prve => ({ ...prve, email: val }))}
            isPassword={false}
            allowClear
            affix={<Sms size={22} color={colors.gray} />}
            type='email-address'
            error={errorInputs.email}
            onEnd={(e) => validateOnEnd(e.nativeEvent.text,'email')}
          />
          <SpaceComponent height={19} />
          <InputComponent
            placeholder='Your password'
            value={inputs.password}
            onChange={(val: string) => setInput(prve => ({ ...prve, password: val }))}
            isPassword={true}
            allowClear
            affix={<Lock1 size={22} color={colors.gray} />}
            error={errorInputs.password}
            onEnd={(e) => validateOnEnd(e.nativeEvent.text,'password')}
          />
          <SpaceComponent height={19} />
          <InputComponent
            placeholder='Confirm password'
            value={inputs.confirmPassword}
            onChange={(val: string) => setInput(prve => ({ ...prve, confirmPassword: val }))}
            isPassword={true}
            allowClear
            affix={<Lock1 size={22} color={colors.gray} />}
            error={errorInputs.confirmPassword}
            onEnd={(e) => validateOnEnd(e.nativeEvent.text,'confirmPassword')}
          />
        </SectionComponent>

        <SectionComponent styles={{ marginTop: 16, marginBottom: 4 }}>
          <ButtonComponent
            style={{maxWidth:271,alignSelf:'center'}}
            onPress={handleRegister}
            textStyle={{ textAlign: 'center', marginRight: 0 }}
            iconFlex='right'
            icon={<ArrowRight style={{ position: 'absolute', right: 16 }} />}
            text='SIGN UP' type='primary' 
            disable={disable}      
            />
        </SectionComponent>
        <SocialLogin />
        <SectionComponent>
          <RowComponent justify='center'>
            <TextComponent text='Already have an account?' />
            <SpaceComponent width={5}/>
            <ButtonComponent text='Sign in' type='link' onPress={() => navigation.navigate('LoginScreen')} />

          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
    </>

  )
}

export default SignUpScreen