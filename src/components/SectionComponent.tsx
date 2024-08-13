import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles';


interface Props {
    children:ReactNode;
    styles?:StyleProp<ViewStyle>
}



const SectionComponent:React.FC<Props> = ({children,styles}) => {
  return (
    <View style={[globalStyles.section,styles]}>
        {children}
    </View>
  )
}

export default SectionComponent