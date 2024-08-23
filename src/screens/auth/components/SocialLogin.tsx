import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { colors, typography } from '../../../styles'
import { Lock1 } from 'iconsax-react-native'
import GoogleSVG from '../../../../assets/svgs/google.svg'
import FacebookSVG from '../../../../assets/svgs/facebook.svg'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";


WebBrowser.maybeCompleteAuthSession();

const SocialLogin = () => {

  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({  
    androidClientId: "604836600198-2qv4db0jbse70didm33sj2lg4qi14ka1.apps.googleusercontent.com",
    iosClientId: "604836600198-nahdkq8fgblmrohl9urc2dhqlf0k2lqg.apps.googleusercontent.com",
    webClientId: "604836600198-qdbedd8q3sovq7181kkaashs2om6g776.apps.googleusercontent.com",
  })


  const handleToken = () => {
    if(response?.type === 'success'){
      const {authentication} = response
      const token = authentication?.accessToken
      console.log('Access Token :',token)
    }
  }

  useEffect(()=>{
    handleToken()
  },[response])

  /* useEffect(() => {
    handleEffect()
  }, [response])

  const handleEffect = async () => {
    const user = await getLocalUser()
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response?.authentication?.accessToken)
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally")
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user")
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token?:string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json()
      await AsyncStorage.setItem("@user", JSON.stringify(user))
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
      console.log("Get User Info: ",error)
    }
  } */

  return (
    <SectionComponent styles={{alignItems:'center'}}>
        <TextComponent text='OR'  color={colors.gray4} size={16}  font={typography.fontFamily.medium}/> 
        <SpaceComponent height={10}/>  
        <ButtonComponent 
            onPress={ async ()=> await promptAsync()}
            style={{width:270,height:56}}           
            textColor={colors.text}
            color={colors.white}
            type='primary'
            text='Login with Google' 
            icon={<GoogleSVG/>}
            iconFlex='left'   
            textFont={typography.fontFamily.regular}      
        />
        <SpaceComponent height={17}/>
         <ButtonComponent 
            style={{width:270,height:56}}           
            textColor={colors.text}
            color={colors.white}
            type='primary'
            text='Login with Facebook' 
            icon={<FacebookSVG/>}
            iconFlex='left'
            textFont={typography.fontFamily.regular}         
        />
    </SectionComponent>
  )
}

export default SocialLogin