import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons';
import TextComponent from './TextComponent';
import { colors, typography } from '~/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/redux/store';
import SpaceComponent from './SpaceComponent';
import {profileMenu} from '~/constants/menu'
import RowComponent from './RowComponent';
import { ProfileMenuItem } from '~/constants/types';
import { removeFromStorage } from '~/utils/storage';
import { removeAuth } from '~/redux/features/auth/authSlice';

const DrawerCustom = ({navigation}:any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {photoUrl,fullName,_id} = useSelector((state:RootState) => state.auth.user)

  const atName = fullName || 'Ashfak Sayem'


  const handleItemMenu = async (item:ProfileMenuItem) => {
    switch (item.key) {
      case 'SignOut':
        await handleSignOut()
        break;
      case 'MyProfile':
        handleMyProfile()
        break;
      default:
        navigation.closeDrawer()
        break;
    }
  }

  const handleSignOut = async () =>{
    await removeFromStorage('isRemember')
    await removeFromStorage('auth')
    dispatch(removeAuth())
  }

  const handleMyProfile = async () =>{
    navigation.navigate('Profile',
      {
        screen:'ProfileScreen',
        params:{idUser: '66bf1f35d1b377b4a9d9e11b'}
      })
  }
 

  return (
    <SafeAreaView style={{flex:1}}>
       <View style={{flex:1,paddingLeft:26}}>
          <TouchableOpacity onPress={handleMyProfile}>
              {photoUrl 
              ? (<Image style={{
                resizeMode:'contain',
                width:60,
                height:60,
                borderRadius:50
              }} source={{uri:photoUrl}}/>) 
              : (<View style={{
                width:60,
                height:60,
                borderRadius:50,
                backgroundColor:colors.primary,        
                justifyContent:'center',
                alignItems:'center'     
              }}>
                <TextComponent size={typography.fontSizeExtraLarge} font={typography.fontFamily.semiBold} text={atName.split(' ').at(-1)?.charAt(0) || 'No'}/>
              </View>)
              }       
              <SpaceComponent height={12}/>
              <TextComponent size={19} font={typography.fontFamily.semiBold} text={atName}/>
          </TouchableOpacity>
          <SpaceComponent height={48}/>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={profileMenu}
            renderItem={({item}) => 
            (<RowComponent styles={{paddingVertical:16}} onPress={()=> handleItemMenu(item)}>
              {item.icon}
              <TextComponent
                style={{marginLeft:14}}
                text={item.title}             
              />
            </RowComponent>)}
            keyExtractor={item => item.key}
          />
          <TouchableOpacity style={{
            width:150,
            height:46,
            borderRadius:8,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'rgba(0, 248, 255, 0.20)'
          }}>
            <MaterialCommunityIcons name="crown" size={21} color="#00f8ff" />
            <TextComponent text='Upgrade Pro' color='#00f8ff' size={typography.fontSizeSmall} font={typography.fontFamily.medium}/>
          </TouchableOpacity>
       </View>
    </SafeAreaView>
  )
}

export default DrawerCustom