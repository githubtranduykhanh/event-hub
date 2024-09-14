import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent';


interface Props{
    isLoading:boolean;
    mes:string;
}

const LoadingComponent:React.FC<Props> = ({isLoading,mes}) => {
  return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
      {isLoading ?
        <ActivityIndicator/>
        : <TextComponent text={mes ?? 'Data not found !'}/>
      }
    </View>
  )
}

export default LoadingComponent