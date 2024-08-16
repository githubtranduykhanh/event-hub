import { View, Text, Button, Image, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { AntDesign } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles';
import { Lock1, Sms, Profile, ArrowLeft } from 'iconsax-react-native';
import { SocialLogin } from '~/screens/auth/components';
import ArrowRight from '../../../assets/svgs/arrow-right.svg'
import { apiRegister } from '~/apis';
import { LoadingModal } from '~/modals';
import { Validate } from '~/utils/validate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/redux/store';
import { registerUser } from '~/redux/features/auth/authActions';


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
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, errorMessage, errors } = useSelector((state: RootState) => state.auth);
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false)

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
    if (errorMessage) {
        Alert.alert('Error', errorMessage);
    }

    if(errors && Object.keys(errors).length > 0){
      setErrorInput(prve => ({...prve,...errors}))
    }
  }, [errorMessage,errors]);





  useEffect(() => {
    setErrorInput({
      email: '',
      password: '',
      fullName: '',
      confirmPassword: ''
    })
  }, [inputs])


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


    dispatch(registerUser(inputs))

    /* setIsLoadingState(true)
    apiRegister(inputs)
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
      }).finally(() => {
        setIsLoadingState(false)
      }) */
  }

  return (
    <>
      <LoadingModal visible={isLoading} />
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
          />
        </SectionComponent>

        <SectionComponent styles={{ marginTop: 16, marginBottom: 4 }}>
          <ButtonComponent
            onPress={handleRegister}
            textStyle={{ textAlign: 'center', marginRight: 0 }}
            iconFlex='right'
            icon={<ArrowRight style={{ position: 'absolute', right: 16 }} />}
            text='SIGN UP' type='primary' />
        </SectionComponent>
        <SocialLogin />
        <SectionComponent>
          <RowComponent justify='center'>
            <TextComponent text='Already have an account?' style={{ marginRight: 5 }} />
            <ButtonComponent text='Sign in' type='link' onPress={() => navigation.navigate('LoginScreen')} />

          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
    </>

  )
}

export default SignUpScreen