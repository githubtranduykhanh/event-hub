import { View, ImageBackground, ScrollView, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import {  globalStyles } from '../styles';
import { memo } from 'react';
import HeaderComponent from '../components/HeaderComponent'

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
              <View style={{flex:1}}>
              <HeaderComponent back={back} title={title}/>
              {returnContainer}
              </View>
            </SafeAreaView>         
        </ImageBackground>
      : <SafeAreaView style={[globalStyles.container]}>
       <View style={{flex:1}}>
          <HeaderComponent back={back} title={title} />
          {returnContainer}
        </View>
      </SafeAreaView>
  )
}

export default memo(ContainerComponent)