import { View, Text, StyleProp, ViewStyle, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles';


interface Props{
    justify?:"center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined;
    align?:'baseline' | 'center' | 'stretch' | 'flex-start' | 'flex-end' | undefined;
    styles?:StyleProp<ViewStyle>;
    children:ReactNode;
    onPress?:()=>void;
}

const RowComponent:React.FC<Props> = ({justify,styles,children,onPress,align}) => {


    const localStyle:StyleProp<ViewStyle> = [globalStyles.row,{justifyContent:justify,alignItems:align ?? 'center'},styles]


  return onPress 
  ?(<TouchableOpacity activeOpacity={0.5}  onPress={onPress} style={localStyle}>
     {children}
  </TouchableOpacity>)  
  :(
    <View style={localStyle}>
      {children}
    </View>
  )
}

export default RowComponent