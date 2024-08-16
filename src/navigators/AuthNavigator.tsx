
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, OnboardingScreen, SplashScreen } from '../screens'
import { ForgotPasswordScreen, SignUpScreen, VericationScreen } from '../screens/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFromStorage } from '~/utils/storage'

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()

    const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

    useEffect(() => {
        const checkFirstTime = async () => {
            const isFirst = await getFromStorage('first')
            setIsFirstTime(!isFirst ?? false)
        };

        checkFirstTime();
    }, []);


    if (isFirstTime === null) {
        // Đang tải trạng thái, có thể hiện một màn hình tải hoặc không làm gì cả
        return <SplashScreen/>;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isFirstTime && <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />}
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
            <Stack.Screen name='VericationScreen' component={VericationScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator