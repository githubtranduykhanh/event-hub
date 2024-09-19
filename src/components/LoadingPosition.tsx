import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent'
import { colors, globalStyles, typography } from '~/styles'

interface IProps {
    visible:boolean;
    message?:string;
    zIndex?:number;
}


const LoadingPosition:React.FC<IProps> = ({visible,message,zIndex}) => {
  return visible && (
    <View style={[globalStyles.modal,{
        zIndex,
        position:'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }]}>
        <ActivityIndicator size={30} color={colors.white}/>
        <TextComponent text={message ?? 'Loading'} color={colors.white} font={typography.fontFamily.medium} size={typography.fontSizeSmall}/>
    </View>
  )
}

export default LoadingPosition