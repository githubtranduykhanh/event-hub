import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent } from '../../components'
import {AntDesign} from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles';
import { Sms } from 'iconsax-react-native';


const LoginScreen = () => {
  return (
    <View style={[globalStyles.container,{padding:16}]}>
      <Text>LoginScreen</Text>
      <ButtonComponent        
        type='primary'
        text='LOGIN' 
        onPress={async () => await AsyncStorage.setItem('assetToken','dfdfdfdfdfdf')}
        icon={<Sms size="20" color={colors.white}/>}
        iconFlex='left'
        textStyle={{textAlign:'center'}}
      />
    </View>
  )
}

export default LoginScreen