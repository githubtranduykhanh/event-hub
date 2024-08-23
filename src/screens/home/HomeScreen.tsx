import { View, Text, Button, SafeAreaView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import { removeAuth } from '~/redux/features/auth/authSlice'
import { removeFromStorage } from '~/utils/storage'
import { colors, globalStyles, typography } from '~/styles'
import { StatusBar } from 'expo-status-bar'
import { CircleComponent, RowComponent, SectionComponent, TextComponent } from '~/components'
import { MenuSVG } from 'assets/svgs'
import { AntDesign } from '@expo/vector-icons';
import { Notification } from 'iconsax-react-native'
const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { fullName, email, role } = useSelector((state: RootState) => state.auth.user)

  const handleLogout = async () => {
    await removeFromStorage('auth')
    dispatch(removeAuth())
  }
  return (
    <View style={[globalStyles.container]}>
      <StatusBar style='light' translucent/>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <View style={{
            height: 136,
            backgroundColor: colors.primary,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30
          }}>
            <SectionComponent styles={{}}>
              <RowComponent justify='space-between'>
                <MenuSVG color={colors.white} fontSize={typography.fontSizeExtraLarge} />
                <View>
                  <RowComponent>
                    <TextComponent text='Current Location' size={typography.fontSizeSmall} color={colors.white2} />
                    <AntDesign name="caretdown" size={11} color={colors.white} />
                  </RowComponent>
                  <TextComponent text='New Yourk, USA' font={typography.fontFamily.medium} color={colors.white} />
                </View>
                <CircleComponent size={36} color='#5D56F3'>
                  <View>
                    <Notification size={typography.fontSizeExtraLarge} variant='Outline' color={colors.white} />
                    <View style={{
                      backgroundColor: '#02E9FE',
                      position: 'absolute',
                      borderRadius: 100,
                      borderWidth: 2,
                      borderColor: '#5D56F3',
                      top: 2,
                      right: 2,
                      width: 10,
                      height: 10,
                    }}>
                    </View>
                  </View>
                </CircleComponent>
              </RowComponent>
            </SectionComponent>
          </View>
          <View style={{ flex: 1}}>
            <TextComponent text='Hello' />
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen