import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~/components'
import {Feather} from '@expo/vector-icons';
import { colors, globalStyles, typography } from '~/styles';
import { IUserProfile } from '~/models/UserModel';
import { TagProfileAbout } from '~/constants/types';
import { randomUUID } from 'expo-crypto';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, authSelector } from '~/redux/store';
import { apiPostFollowersUser, apiPostUnFollowersUser } from '~/apis';
import { ApiHelper } from '~/apis/helper';
import { addProfile } from '~/redux/features/profile/profileSlice';
import { LoadingModal } from '~/modals';
import { TextHelper } from '~/utils/text';
import TagAboutContent from './TagAboutContent';
import { updateUserFollowing } from '~/redux/features/auth/authSlice';



interface IProps{
  userProfile:IUserProfile
}
const AboutProfile:React.FC<IProps> = ({userProfile}) => {
  const dispatch = useDispatch<AppDispatch>()
  const {user} = useSelector(authSelector)
  const [tagSelected,setTagSelected] = useState<string>(TagProfileAbout[0].key)
  const [isModalLoading,setIsModalLoading] = useState<boolean>(false)

  const handleTagSelected = (tagKey:string) => {
    setTagSelected(tagKey)
  }
  const handleFollow = () => {
      apiPostFollowersUser({idFollow:userProfile._id})
      .then((res)=>res.data)
      .then(data => {
        if(data.status && data.data){
          dispatch(addProfile({
            followers:data.data.followUser
          }))
          dispatch(updateUserFollowing(data.data.myFollowingUser))
        }
      })
      .catch((err)=>console.log('apiPostFollowersUser',ApiHelper.getMesErrorFromServer(err)))
      .finally(()=> setIsModalLoading(false))
  }


  const handleUnFollow = () => {
    setIsModalLoading(true)
    apiPostUnFollowersUser({idFollow:userProfile._id})
    .then((res)=>res.data)
    .then(data => {
      if(data.status && data.data){
        dispatch(addProfile({
          followers:data.data.followUser
        }))
        dispatch(updateUserFollowing(data.data.myFollowingUser))
      }
    })
    .catch((err)=>console.log('apiPostUnFollowersUser',ApiHelper.getMesErrorFromServer(err)))
    .finally(()=> setIsModalLoading(false))
  }
  
  return (
    <View style={{flex:1}}>
      <RowComponent justify='center'>
        {userProfile.followers?.includes(user._id) 
          ? <ButtonComponent
              onPress={handleUnFollow}
              style={[globalStyles.btnAbout]}
              text='Un Follow'
              type='primary'
              iconFlex='left'
              icon={
                <Feather name="user-minus" size={22} color={colors.white} />
              }
              textStyle={[globalStyles.btnAboutText]}
            />
          : <ButtonComponent
              onPress={handleFollow}
              style={[globalStyles.btnAbout]}
              text='Follow'
              type='primary'
              iconFlex='left'
              icon={
                <Feather name="user-plus" size={22} color={colors.white} />
              }
              textStyle={[globalStyles.btnAboutText]}
            />
        }
        
        <SpaceComponent width={17}/>
        <ButtonComponent
          style={[globalStyles.btnAbout]}
          text='Massages'
          type='ouline'
          iconFlex='left'
          icon={
            <Feather name="message-circle" size={22} color={colors.primary} />
          }
          textStyle={[globalStyles.btnAboutText]}
        />
      </RowComponent>
      <SpaceComponent height={30}/>
      <SectionComponent>
        <RowComponent justify='space-between'>
          {TagProfileAbout.map((tagItem)=>(<TouchableOpacity key={randomUUID()} onPress={() => handleTagSelected(tagItem.key)}>
            <TextComponent text={tagItem.title.toUpperCase()} font={typography.fontFamily.medium} size={typography.fontSizeMedium} color={colors.primary}/>
            <SpaceComponent height={5}/>
            <View style={{width:'100%',height:3,borderRadius:10,backgroundColor:tagSelected === tagItem.key ? colors.primary : undefined}}/>
          </TouchableOpacity>))}
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={20}/>
      <SectionComponent styles={{flex:1}}>
       <TagAboutContent tagSelected={tagSelected} userProfile={userProfile}/>
      </SectionComponent>
      <LoadingModal visible={isModalLoading}/>
    </View>
  )
}

export default AboutProfile
