import { View, Text, StyleProp, TextStyle } from 'react-native'
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
}


const TextComponent: React.FC<Props> = ({text,color,size,flex,font,style,title}) => {
  return (
   <Text style={[{
    color:color ?? colors.text,
    fontSize:size ?? title ? typography.fontSizeExtraLarge : typography.fontSizeSmall,
    flex: flex ?? 0,
    fontFamily:font ?? title ? typography.fontFamily.bold : typography.fontFamily.regular
   },style]}>
    {text}
   </Text>
  )
}

export default TextComponent