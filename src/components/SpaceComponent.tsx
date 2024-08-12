import { View, Text } from 'react-native'
import React from 'react'

interface Props {
    width?:number;
    height?:number;
}


const SpaceComponent : React.FC<Props> = ({width,height}) => {    
  return (
    <View style={{width,height}}>  
    </View>
  )
}

export default SpaceComponent