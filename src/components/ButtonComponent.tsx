import { View, Text, StyleProp, ViewStyle, TextStyle, Touchable, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import TextComponent from './TextComponent';

interface Props {
    icon?:ReactNode;
    text:string;
    type?:'primary' | 'text' | 'link';
    color?:string;
    style?:StyleProp<ViewStyle>;
    textColor?:string;
    textStyle?:StyleProp<TextStyle>;
    onPress?:() => void;
    iconFlex:'right' | 'left';
}


const ButtonComponent:React.FC<Props> = ({icon,text,type,color,style,textColor,textStyle,onPress,iconFlex}) => {
  return (
   <TouchableOpacity>
        {icon && iconFlex === 'left' && icon}
        <TextComponent text={text} color={textColor} style={textStyle}/>
        {icon && iconFlex === 'right' && icon}
   </TouchableOpacity>
  )
}

export default ButtonComponent