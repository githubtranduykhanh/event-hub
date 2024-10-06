import { View, Text, DimensionValue, StyleProp, ViewStyle } from 'react-native'
import React from 'react'

interface Props {
    width?:DimensionValue | undefined;
    height?:DimensionValue | undefined;
    color?:string;
    style?: StyleProp<ViewStyle>
}


const SpaceComponent : React.FC<Props> = ({width,height,color,style}) => {    
  return (
    <View style={[{width,height,backgroundColor:color},style]}>  
    </View>
  )
}

export default SpaceComponent