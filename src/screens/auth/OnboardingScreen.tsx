import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors, globalStyles, typography } from '../../styles'
import Swiper from 'react-native-swiper'
import { saveToStorage } from '~/utils/storage'

const OnboardingScreen = ({navigation}:any) => {

    const [indexSwiper,setIndexSwiper] = useState(0)

    const handleClose = async () => {
        await saveToStorage('first',true)
        navigation.navigate('LoginScreen')
    }

    return (
        <View style={[globalStyles.container,{position:'relative'}]}>
            <Swiper
                onIndexChanged={(index) => setIndexSwiper(index)}
                activeDotColor={colors.white}
                loop={false}
                index={indexSwiper}
            >
                <Image
                    style={[globalStyles.imageOnboarding]}
                    source={require('../../../assets/images/onboarding-1.png')}
                />
                <Image
                    style={[globalStyles.imageOnboarding]}
                    source={require('../../../assets/images/onboarding-2.png')}
                />
                <Image
                    style={[globalStyles.imageOnboarding]}
                    source={require('../../../assets/images/onboarding-2.png')}
                />
            </Swiper>
            <TouchableHighlight 
                style={[globalStyles.arrowsText,{left:50}]}
                onPress={handleClose}
                >
                <Text style={[style.text,{color:colors.gray2}]}>Skip</Text>
            </TouchableHighlight>
            
            <TouchableHighlight 
                style={[globalStyles.arrowsText,{right:50}]}
                onPress={async () => indexSwiper < 2 ? setIndexSwiper(prve => ++prve) : await handleClose()}
                >
                <Text style={style.text}>Next</Text>
            </TouchableHighlight>
        </View>
    )
}

export default OnboardingScreen


const style = StyleSheet.create({
    text:{color:colors.white,fontSize:16,fontFamily:typography.fontFamily.semiBold}
})