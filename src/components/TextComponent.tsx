import { View, Text, StyleProp, TextStyle, Platform } from 'react-native'
import React from 'react'
import { appInfo, colors, typography } from '../styles';

interface Props {
    text:string;
    color?:string;
    size?:number;
    flex?:number;
    font?:string;
    style?:StyleProp<TextStyle>;
    title?:boolean;
    lineHeight?:number;
}


const TextComponent: React.FC<Props> = ({lineHeight,text,color,size,flex,font,style,title}) => {
  
  const fontSizeDefault = Platform.OS === 'ios' ? typography.fontSizeMedium : typography.fontSizeSmall
  return (
   <Text style={[{
    color:color ?? colors.text,
    lineHeight,
    fontSize:size ?? (title ? typography.fontSizeExtraLarge : fontSizeDefault),
    flex: flex ?? 0,
    fontFamily:font ?? (title ? typography.fontFamily.medium : typography.fontFamily.regular)
   },style]}>
    {text}
   </Text>
  )
}

export default TextComponent