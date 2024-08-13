import { View, Text, StyleProp, ViewStyle, TextStyle, Touchable, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import TextComponent from './TextComponent';
import { colors, globalStyles } from '../styles';

interface Props {
    flex?:'auto' | 'flex-end' | 'flex-start' | 'center';  
    icon?:ReactNode;
    text:string;
    type?:'primary' | 'text' | 'link';
    color?:string;
    style?:StyleProp<ViewStyle>;
    textColor?:string;
    textStyle?:StyleProp<TextStyle>;
    onPress?:() => void;
    iconFlex?:'right' | 'left';
}


const ButtonComponent:React.FC<Props> = ({flex,icon,text,type,color,style,textColor,textStyle,onPress,iconFlex}) => {
  return type === 'primary' 
  ? (
    <TouchableOpacity 
    onPress={onPress}
    style={[globalStyles.button,{
     backgroundColor:color ?? colors.primary,   
     alignSelf:flex ?? 'auto' 
    },style]}>
         {icon && iconFlex !== 'right' && icon}
             <TextComponent 
                text={text} 
                color={textColor ?? colors.white} 
                style={[textStyle,{
                  marginLeft:icon && iconFlex === 'left' ? 12 : 0,
                  marginRight:icon && iconFlex === 'right' ? 12 : 0
                }]}
                flex={icon && iconFlex === 'right' ? 1 : 0}
             />
         {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) 
  : (
    <TouchableOpacity>
      <TextComponent text={text} color={type === 'link' ? colors.link : colors.text}/>
    </TouchableOpacity>
  )
}

export default ButtonComponent