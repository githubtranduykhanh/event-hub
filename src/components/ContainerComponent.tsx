import { View, Text, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { colors, globalStyles, typography } from '../styles';
import { useNavigation } from '@react-navigation/native';
import RowComponent from './RowComponent';
import ButtonComponent from './ButtonComponent';
import { ArrowLeft } from 'iconsax-react-native';
import TextComponent from './TextComponent';
import { memo } from 'react';
import {HeaderComponent} from '../components'

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?:boolean
}





const ContainerComponent: React.FC<Props> = ({ back,isImageBackground, isScroll, title, children }) => {

  const returnContainer = isScroll ? <ScrollView style={[globalStyles.container]}>{children}</ScrollView> : <View  style={[globalStyles.container]}>{children}</View>
 
  return (
      isImageBackground
      ? <ImageBackground 
          source={require('../../assets/images/splash-screen.png')}
          style={{flex:1}}
          imageStyle={{flex:1}}
          >
            <SafeAreaView style={[globalStyles.container]}>
            <HeaderComponent back={back} title={title} returnContainer={returnContainer}/>
            </SafeAreaView>         
        </ImageBackground>
      : <SafeAreaView style={[globalStyles.container]}>
        <View>
        <HeaderComponent back={back} title={title} returnContainer={returnContainer}/>
        </View>
      </SafeAreaView>
  )
}

export default memo(ContainerComponent)