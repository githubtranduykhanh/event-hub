import { View, Text, Alert } from 'react-native'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { ContainerComponent, TextComponent, SectionComponent, SpaceComponent, InputComponent, ButtonComponent, RowComponent } from '../../components'
import { Lock1, Sms } from 'iconsax-react-native'
import { colors, typography } from '../../styles'
import ArrowRight from '../../../assets/svgs/arrow-right.svg'
import { apiSentCodeEmail } from '~/apis'
import { LoadingModal } from '~/modals'
import { TextHelper } from '~/utils/text';
import { Validate } from '~/utils/validate';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import { ressetPasswordUser } from '~/redux/features/auth/authActions'
import { resetErrorMessage, resetErrorMessageAndErrors, resetErrors } from '~/redux/features/auth/authSlice'

interface IInputs {
  number1: string;
  number2: string;
  number3: string;
  number4: string;
}

interface IPassInputs {
  newPassword:string;
  confirmPassword:string;
}

const initialPassInputs:IPassInputs = {
  newPassword:'',
  confirmPassword:''
}

const ForgotPasswordScreen = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, errorMessage, errors } = useSelector((state: RootState) => state.auth);
  const [codes, setCodes] = useState<number[]>([])
  const [email, setEmail] = useState<string>('')
  const [isLoadingVerication, setIsLoadingVerication] = useState<boolean>(false)
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const [passInputs, setPassInputs] = useState<IPassInputs>(initialPassInputs)
  const [textErrorMessage, setTextErrorMessage] = useState<string[]|null>(null)
  const [inputs, setInputs] = useState<IInputs>({
    number1: '',
    number2: '',
    number3: '',
    number4: ''
  })

  const [errorPassInputs, setErrorPassInputs] = useState<IPassInputs>(initialPassInputs)



  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();



  useEffect(()=>{
    setTextErrorMessage(null)
    setErrorPassInputs(initialPassInputs)
  },[passInputs,inputs])

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage)
      dispatch(resetErrorMessage())
    }

    if (errors && Object.keys(errors).length > 0) {
      setTextErrorMessage(Object.values(errors))
      dispatch(resetErrors())
    }
  }, [errorMessage, errors])

  const handleOnChange = (val: string, name: string, nextRef?: MutableRefObject<any>) => {
    setInputs(prve => ({ ...prve, [name]: val }))
    nextRef && val && nextRef.current.focus()
  }

  const validateOnEnd = (val:string,name:string) => {
    if(val.trim() === ''){
      setErrorPassInputs(prevErrors => ({ ...prevErrors, [name]: `${TextHelper.capitalizeFirstLetter(name)} is required.` }))
      return
    }
    else if(name === 'newPassword') Validate.Password(val) ? setErrorPassInputs(prev => ({ ...prev,newPassword:''}))   :setErrorPassInputs(prev => ({ ...prev,newPassword:'Password must be greater than 6 characters.'}))
    else if(name === 'confirmPassword') Validate.ConfirmPassword(passInputs.newPassword,val) ? setErrorPassInputs(prev => ({ ...prev,confirmPassword:''})) : setErrorPassInputs(prev => ({ ...prev,confirmPassword:'Password confirmation must match the password.'}))
  }
  const handleRessetPassword = () => {
      if(passInputs.newPassword === ''){
        setErrorPassInputs(prevErrors => ({ ...prevErrors, newPassword: `NewPassword is required.` }))
        return
      }

      if(passInputs.confirmPassword === ''){
        setErrorPassInputs(prevErrors => ({ ...prevErrors, confirmPassword: `ConfirmPassword is required.` }))
        return
      }

      if(!Validate.Password(passInputs.newPassword)){
        setErrorPassInputs(prev => ({ ...prev,newPassword:'Password must be greater than 6 characters.'}))
        return
      }

      if(!Validate.ConfirmPassword(passInputs.newPassword,passInputs.confirmPassword)){
        setErrorPassInputs(prev => ({ ...prev,confirmPassword:'Password confirmation must match the password.'}))
        return
      }

      if(!Object.values(inputs).every((value,index)=> +value === codes[index])){
        
        setTextErrorMessage(['Invalid confirmation code'])
        return
      }

      dispatch(ressetPasswordUser({codes,email,newPassword:passInputs.newPassword,confirmPassword:passInputs.confirmPassword}))
  }
  const handleSend = () => {
    setIsLoadingVerication(true)
    apiSentCodeEmail({ email,title:'ressetPassword' })
      .then((res => res.data))
      .then(data => {
        if (data.status) {
          setCodes(data.numbers ?? [])
          setDisplayForm(true)
        } else {
          Alert.alert('Error', data.mes)
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.log(error.response.data.mes)
          Alert.alert('Error Sent Code Email', error.response.data.mes)
        } else {
          console.log({ message: 'An unknown error has occurred' })
        }
      })
      .finally(() => setIsLoadingVerication(false))
  }

  return (
    <>
      <LoadingModal visible={isLoading} />
      <LoadingModal visible={isLoadingVerication} />
      <ContainerComponent back isImageBackground>
        <SpaceComponent height={7} />
        <SectionComponent>
          <TextComponent text='Resset Password' title />
          <TextComponent style={{ width: 244 }} lineHeight={25} text='Please enter your email address to request a password reset' />
          <SpaceComponent height={26} />
          {
            displayForm
              ? (<>
                <RowComponent styles={{ justifyContent: 'space-around' }}>
                  <InputComponent
                    styles={{ width: 55, height: 55, justifyContent: 'center', padding: 0 }}
                    styleInput={{ fontFamily: typography.fontFamily.medium, fontSize: typography.fontSizeExtraLarge, textAlign: 'center' }}
                    placeholder='-'
                    type='numeric'
                    value={inputs.number1}
                    onChange={(val) => handleOnChange(val, 'number1', ref2)}
                    inputRef={ref1}
                    maxLength={1}
                  />

                  <InputComponent
                    styles={{ width: 55, height: 55, justifyContent: 'center', padding: 0 }}
                    styleInput={{ fontFamily: typography.fontFamily.medium, fontSize: typography.fontSizeExtraLarge, textAlign: 'center' }}
                    placeholder='-'
                    type='numeric'
                    value={inputs.number2}
                    onChange={(val) => handleOnChange(val, 'number2', ref3)}
                    inputRef={ref2}
                    maxLength={1}
                  />

                  <InputComponent
                    styles={{ width: 55, height: 55, justifyContent: 'center', padding: 0 }}
                    styleInput={{ fontFamily: typography.fontFamily.medium, fontSize: typography.fontSizeExtraLarge, textAlign: 'center' }}
                    placeholder='-'
                    type='numeric'
                    value={inputs.number3}
                    onChange={(val) => handleOnChange(val, 'number3', ref4)}
                    inputRef={ref3}
                    maxLength={1}
                  />

                  <InputComponent
                    styles={{ width: 55, height: 55, justifyContent: 'center', padding: 0 }}
                    styleInput={{ fontFamily: typography.fontFamily.medium, fontSize: typography.fontSizeExtraLarge, textAlign: 'center' }}
                    placeholder='-'
                    type='numeric'
                    value={inputs.number4}
                    onChange={(val) => handleOnChange(val, 'number4')}
                    inputRef={ref4}
                    maxLength={1}
                  />
                </RowComponent>
                <SpaceComponent height={19} />
                <InputComponent
                  placeholder='Your new password'
                  value={passInputs.newPassword}
                  onChange={(val: string) => setPassInputs(prve => ({ ...prve, newPassword: val }))}
                  isPassword={true}
                  allowClear
                  affix={<Lock1 size={22} color={colors.gray} />}
                  error={errorPassInputs.newPassword}
                  onEnd={(e) => validateOnEnd(e.nativeEvent.text,'newPassword')}
                />
                <SpaceComponent height={19} />
                <InputComponent
                  placeholder='Confirm password'
                  value={passInputs.confirmPassword}
                  onChange={(val: string) => setPassInputs(prve => ({ ...prve, confirmPassword: val }))}
                  isPassword={true}
                  allowClear
                  affix={<Lock1 size={22} color={colors.gray} />}
                  error={errorPassInputs.confirmPassword}
                  onEnd={(e) => validateOnEnd(e.nativeEvent.text,'confirmPassword')}
                />
                <SpaceComponent height={40} />
                <ButtonComponent
                  style={{maxWidth:271,alignSelf:'center'}}
                  onPress={handleRessetPassword}
                  textStyle={{textAlign: 'center', marginRight: 0 }}
                  iconFlex='right'
                  icon={<ArrowRight style={{ position: 'absolute', right: 16 }} />}
                  text='RESSET PASSWORD' type='primary' />
              </>)
              : (<>
                <InputComponent
                  placeholder='abc@email.com'
                  value={email}
                  onChange={(val: string) => setEmail(val)}
                  isPassword={false}
                  allowClear
                  affix={<Sms size={22} color={colors.gray} />}
                  type='email-address'
                />
                <SpaceComponent height={40} />
                <ButtonComponent
                  style={{maxWidth:271,alignSelf:'center'}}
                  onPress={handleSend}
                  textStyle={{ textAlign: 'center', marginRight: 0 }}
                  iconFlex='right'
                  icon={<ArrowRight style={{ position: 'absolute', right: 16 }} />}
                  text='SEND' type='primary' />
              </>)
          }
          <SpaceComponent height={7}/>
          {textErrorMessage && textErrorMessage?.map((value,index)=>(
            <TextComponent style={{marginTop:5}} color={colors.danger} text={value} key={`TextErrorMessage-${index}`}/>
          ))}
        </SectionComponent>
      </ContainerComponent>
    </>
  )
}

export default ForgotPasswordScreen