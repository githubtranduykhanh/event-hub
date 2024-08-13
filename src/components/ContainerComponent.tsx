import { View, Text, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { colors, globalStyles, typography } from '../styles';
import { useNavigation } from '@react-navigation/native';
import RowComponent from './RowComponent';
import ButtonComponent from './ButtonComponent';
import { ArrowLeft } from 'iconsax-react-native';
import TextComponent from './TextComponent';
import { memo } from 'react';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?:boolean
}




const ContainerComponent: React.FC<Props> = ({ back,isImageBackground, isScroll, title, children }) => {

  const returnContainer = isScroll ? <ScrollView style={[globalStyles.container]}>{children}</ScrollView> : <View  style={[globalStyles.container]}>{children}</View>
  const navigation:any = useNavigation()

  const HeaderComponent = () => {
    return (
      <View style={{flex:1}}>
        {(title || back) 
        && (<RowComponent styles={{marginLeft:16,minWidth:48,minHeight:48}}>
            {back && (<TouchableOpacity style={{marginRight:5}} onPress={()=>navigation.goBack()}>
                  <ArrowLeft  size={typography.fontSizeExtraLarge} color={colors.text}/>           
              </TouchableOpacity>)      
            }
            {title && (<TextComponent text={title} size={typography.fontSizeExtraLarge} font={typography.fontFamily.medium}/>)}
        </RowComponent>)}
        {returnContainer}
      </View>
    )
  }

  return (
      isImageBackground
      ? <ImageBackground 
          source={require('../../assets/images/splash-screen.png')}
          style={{flex:1}}
          imageStyle={{flex:1}}
          >
            <SafeAreaView style={[globalStyles.container]}>
            <HeaderComponent/>
            </SafeAreaView>         
        </ImageBackground>
      : <SafeAreaView style={[globalStyles.container]}>
        <View>
          <HeaderComponent/>
        </View>
      </SafeAreaView>
  )
}

export default memo(ContainerComponent)