import { View, Text, StyleProp, ViewStyle, TextStyle, Touchable, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import TextComponent from './TextComponent';
import { colors, globalStyles, typography } from '../styles';

interface Props {
    flex?:'auto' | 'flex-end' | 'flex-start' | 'center';  
    icon?:ReactNode;
    text:string;
    type:'primary' | 'text' | 'link' | 'ouline';
    color?:string;
    style?:StyleProp<ViewStyle>;
    textFont?:string
    textColor?:string;
    textSize?:number;
    textStyle?:StyleProp<TextStyle>;
    onPress?:() => void;
    iconFlex?:'right' | 'left';
    disable?:boolean;
}


const ButtonComponent:React.FC<Props> = ({disable,flex,icon,text,type,color,style,textFont,textColor,textSize,textStyle,onPress,iconFlex}) => {
  return type === 'primary' 
  ? (
    <TouchableOpacity 
    onPress={onPress}
    disabled={disable}
    style={[globalStyles.button,globalStyles.shadow,{
     backgroundColor:color ?? colors.primary,   
     alignSelf:flex ?? 'auto',
     opacity:disable ? 0.7 : 1
    },style]}>
         {icon && iconFlex !== 'right' && icon}
             <TextComponent 
                text={text} 
                size={textSize ?? 16}
                color={textColor ?? colors.white} 
                style={[{
                  marginLeft:icon && iconFlex === 'left' ? 12 : 0,
                  marginRight:icon && iconFlex === 'right' ? 12 : 0,
                },textStyle]}
                font={textFont ?? typography.fontFamily.medium}
                flex={icon && iconFlex === 'right' ? 1 : 0}
             />
         {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) 
  : type === 'ouline' 
  ? (<TouchableOpacity onPress={onPress} style={[globalStyles.buttonOuline,style]}>
      {icon && iconFlex !== 'right' && icon}
      <TextComponent 
      text={text} 
      size={textSize ?? 16}
      color={textColor ?? colors.primary} 
      style={[{
        marginLeft:icon && iconFlex === 'left' ? 12 : 0,
        marginRight:icon && iconFlex === 'right' ? 12 : 0,
      },textStyle]}
      font={textFont ?? typography.fontFamily.medium}
      flex={icon && iconFlex === 'right' ? 1 : 0}
      />
      {icon && iconFlex === 'right' && icon}
  </TouchableOpacity>)
  : (
    <TouchableOpacity onPress={onPress} style={[style]}>
      <TextComponent text={text} size={textSize} color={type === 'link' ? colors.link : colors.text}/>
    </TouchableOpacity>)
  
}

export default ButtonComponent