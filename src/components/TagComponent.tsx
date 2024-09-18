import { View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React, { ReactNode } from 'react'
import TextComponent from './TextComponent';
import { colors, globalStyles, typography } from '~/styles';


interface Props {
    onPress?:() => void;
    lable:string;
    icon?:ReactNode;
    bgColor?:string;
    textColor?:string;
    styles?:StyleProp<ViewStyle>;
    textStyles?:StyleProp<TextStyle>;
    textSize?:number;
    textFont?:string;
}

const TagComponent:React.FC<Props> = ({onPress,textFont,lable,icon,bgColor,textColor,styles,textStyles,textSize}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={[globalStyles.row,{
            backgroundColor:bgColor ?? '#5D56F3',
            padding:7,
            borderRadius:50,
            justifyContent:'center',
            alignItems:'center'
    },styles]}>
        {icon && icon}
        <TextComponent text={lable} font={textFont} style={[{marginLeft:icon ? 5 : 0},textStyles]} size={textSize ?? 13} color={textColor ?? colors.white}/>
    </TouchableOpacity>
  )
}

export default TagComponent