import { View, ImageBackground, ScrollView, SafeAreaView, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle } from 'react-native'
import React, { ReactNode } from 'react'
import {  globalStyles } from '../styles';
import { memo } from 'react';
import HeaderComponent from '../components/HeaderComponent'

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?:boolean;
  imageBackgroundSource?:ImageSourcePropType;
  imageBackgroundStyle?:StyleProp<ViewStyle>;
  imageStyle?:StyleProp<ImageStyle>;
  isSafeAreaView?:boolean;
  navigateName?:string;
  popToTop?:boolean;
}



const ContainerComponent: React.FC<Props> = ({ isSafeAreaView = true,navigateName,popToTop ,back,isImageBackground, isScroll, title, children,imageBackgroundSource,imageBackgroundStyle,imageStyle }) => {

  const returnContainer = isScroll ? <ScrollView style={[globalStyles.container]}>{children}</ScrollView> : <View  style={[globalStyles.container]}>{children}</View>
 
  return (
      isImageBackground
      ? <ImageBackground 
          source={imageBackgroundSource ?? require('../../assets/images/splash-screen.png')}
          style={[{flex:1},imageBackgroundStyle]}
          imageStyle={[{flex:1},imageStyle]}
          >
            {isSafeAreaView  
            ? <SafeAreaView style={[globalStyles.container]}>
                <View style={{flex:1}}>
                <HeaderComponent back={back} title={title} navigateName={navigateName} popToTop={popToTop}/>
                {returnContainer}
                </View>
              </SafeAreaView> 
            : <View style={{flex:1}}>
              <HeaderComponent back={back} title={title} navigateName={navigateName} popToTop={popToTop}/>
              {returnContainer}
              </View>
            }
                 
        </ImageBackground>
      : isSafeAreaView 
      ? <SafeAreaView style={[globalStyles.container]}>
          <View style={{flex:1}}>
            <HeaderComponent back={back} title={title} navigateName={navigateName} popToTop={popToTop}/>
            {returnContainer}
          </View>
        </SafeAreaView> 
      : <View style={{flex:1}}>
          <HeaderComponent back={back} title={title} navigateName={navigateName} popToTop={popToTop}/>
          {returnContainer}
        </View>
  )
}

export default memo(ContainerComponent)