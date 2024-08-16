import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { colors, typography } from '../../../styles'
import { Lock1 } from 'iconsax-react-native'
import Google from '../../../../assets/svgs/google.svg'
import Facebook from '../../../../assets/svgs/facebook.svg'
import { clearStorage } from '~/utils/storage'

const SocialLogin = () => {
  return (
    <SectionComponent styles={{alignItems:'center'}}>
        <TextComponent text='OR'  color={colors.gray4} size={16}  font={typography.fontFamily.medium}/> 
        <SpaceComponent height={10}/>  
        <ButtonComponent 
            onPress={ async ()=> await clearStorage()}
            style={{width:270,height:56}}           
            textColor={colors.text}
            color={colors.white}
            type='primary'
            text='Login with Google' 
            icon={<Google/>}
            iconFlex='left'   
            textFont={typography.fontFamily.regular}      
        />
        <SpaceComponent height={17}/>
         <ButtonComponent 
            style={{width:270,height:56}}           
            textColor={colors.text}
            color={colors.white}
            type='primary'
            text='Login with Facebook' 
            icon={<Facebook/>}
            iconFlex='left'
            textFont={typography.fontFamily.regular}         
        />
    </SectionComponent>
  )
}

export default SocialLogin