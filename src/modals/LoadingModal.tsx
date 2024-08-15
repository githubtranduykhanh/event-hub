import { View, Text, ActivityIndicator, Modal } from 'react-native'
import React, { memo } from 'react'
import { colors, globalStyles, typography } from '~/styles'
import { TextComponent } from '~/components'

interface Props {
    visible:boolean;
    message?:string;
}


const LoadingModal:React.FC<Props> = ({visible,message}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType='fade'
    >
        <View style={globalStyles.modal}>
            <ActivityIndicator size={30} color={colors.white}/>
            <TextComponent text={message ||'Loading'} color={colors.white} font={typography.fontFamily.medium} size={typography.fontSizeSmall}/>
        </View>  
    </Modal> 
  )
}

export default memo(LoadingModal)