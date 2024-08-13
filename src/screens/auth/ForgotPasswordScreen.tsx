import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ContainerComponent,TextComponent, SectionComponent, SpaceComponent, InputComponent, ButtonComponent } from '../../components'
import { Sms } from 'iconsax-react-native'
import { colors } from '../../styles'
import ArrowRight from '../../../assets/svgs/arrow-right.svg'
const ForgotPasswordScreen = () => {

  const [email,setEmail] = useState('')

  return (
    <ContainerComponent back isImageBackground>
      <SpaceComponent height={7}/>
      <SectionComponent>
        <TextComponent text='Resset Password' title/>
        <TextComponent style={{width:244}} lineHeight={25} text='Please enter your email address to request a password reset'/>
        
        <SpaceComponent height={26}/>
        <InputComponent      
            placeholder='abc@email.com'
            value={email} 
            onChange={(val: string)=> setEmail(val)}
            isPassword={false}
            allowClear
            affix={<Sms size={22} color={colors.gray}/>}
            type='email-address'
        />
        <SpaceComponent height={40}/>
        <ButtonComponent 
          textStyle={{textAlign:'center',marginRight:0}}  
          iconFlex='right' 
          icon={<ArrowRight style={{position: 'absolute',right: 16}}  />} 
          text='SEND' type='primary' />
      </SectionComponent>
      
    </ContainerComponent>
  )
}

export default ForgotPasswordScreen