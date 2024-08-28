import { View, Text, ViewStyle, StyleProp, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { colors, globalStyles } from '~/styles';


interface Props {
    onPress?:()=>void;
    children:ReactNode;
    styles?:StyleProp<ViewStyle>;
    isShadow?:boolean;
    color?:string;
}

const CardComponent:React.FC<Props> = ({onPress,children,styles,isShadow,color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[globalStyles.card,isShadow && globalStyles.shadowCard,{
      backgroundColor:color ?? colors.white
    },styles]}>
        {children}
    </TouchableOpacity>
  )
}

export default CardComponent