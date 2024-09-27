import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, RowComponent } from '~/components'
import {Feather} from '@expo/vector-icons';
import { colors } from '~/styles';
const AboutProfile = () => {
  return (
    <View>
      <RowComponent>
        <ButtonComponent
          text='Follow'
          type='primary'
          iconFlex='left'
          icon={
            <Feather name="user-plus" size={24} color={colors.white} />
          }
        />
        <ButtonComponent
          text='Massages'
          type='ouline'
          iconFlex='left'
          icon={
            <Feather name="message-circle" size={24} color={colors.primary} />
          }
        />
      </RowComponent>
    </View>
  )
}

export default AboutProfile
