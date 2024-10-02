import { View, Text, ScrollView, Share, Alert } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Modalize } from 'react-native-modalize';
import { AvatarComponent, ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent, UserComponent } from '~/components';
import { Portal } from 'react-native-portalize';
import { colors, globalStyles, typography } from '~/styles';
import { useDebounce } from '~/hooks';
import { SearchNormal1 } from 'iconsax-react-native';
import ArrowRight from '../../assets/svgs/arrow-right.svg'
import { useSelector } from 'react-redux';
import { authSelector } from '~/redux/store';
import { apiGetFriendUser, apiPostInviteNotificationUser } from '~/apis';
import { ApiHelper } from '~/apis/helper';
import { IUserProfile } from '~/models/UserModel';
import { randomUUID } from 'expo-crypto';
import { NumberHelper } from '~/utils/number';
import {AntDesign} from '@expo/vector-icons';
import LoadingModal from './LoadingModal';
import { EventModel } from '~/models';
interface IProps {
  onClose:()=>void;
  visible:boolean;
  event:EventModel;
}
const ModalizeInvite:React.FC<IProps> = ({visible,onClose,event}) => {
  const {user} = useSelector(authSelector)
  const modalizeRef = useRef<Modalize>(null);
  const [search, setSearch] = useState<string>('')
  const [friends, setFriends] = useState<IUserProfile[]>([])
  const [userSelected, setUserSelected] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const debounceSearch = useDebounce(search, 500)
  useEffect(() => {
    if (visible) {
        modalizeRef.current?.open(); // Mở modal khi visible = true
    } else {
        modalizeRef.current?.close(); // Đóng modal khi visible = false
    }
  }, [visible]);


  useEffect(()=>{
    apiGetFriendUser()
    .then((res) => res.data)
    .then((data) => {
      if(data.status && data.data) setFriends(data.data)
      else console.log(data)
    })
    .catch((err) => console.log(ApiHelper.getMesErrorFromServer(err)))
  },[user.following])


  const filteredFriends = useMemo(() => {
    const searchValue = debounceSearch.toLowerCase().trim();
    if (!searchValue) return friends;
  
    return friends.filter((friend) => {
      const friendName = friend.fullName?.toLowerCase().trim();
      return friendName?.includes(searchValue);
    });
  }, [debounceSearch, friends]);


  const handleUserSelected = (id:string) =>{
    setUserSelected((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  }

  const handleInvite = async () =>{
    if(userSelected.length <= 0) {
      Alert.alert('Error','Selected user')
      return
    }
    
    setIsLoading(true)
    try {
      const res = await  apiPostInviteNotificationUser({
        messageTitle:`${user.fullName} Invite ${event.title}`,
        messageBody:'Invite Notification',
        idUsers:userSelected,
        idEvent:event._id
      })
      const data = res.data
      if(data.status) Alert.alert('Susse',data.mes)
      else Alert.alert('Error', data.mes)
    } catch (err) {
      console.log(ApiHelper.getMesErrorFromServer(err))
    } finally {
      setIsLoading(false)
    }
    
  }

  const ShareInvite  = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome content!',
        url: 'https://example.com', // Nếu bạn muốn chia sẻ một URL, có thể thêm vào đây
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Nếu có activityType, người dùng đã chia sẻ nội dung trong một ứng dụng cụ thể
          console.log('Shared with activity type:', result.activityType);
        } else {
          // Người dùng đã chia sẻ nội dung
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Người dùng đã hủy chia sẻ
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share content.');
    }
  }
  return (
    <>
    <Portal>
            <Modalize
                handlePosition='inside'
                modalStyle={{borderTopEndRadius:38,borderTopStartRadius:38}}
                onClose={onClose}
                ref={modalizeRef}
                HeaderComponent={
                  <View style={{paddingTop:24,paddingBottom:34,paddingHorizontal:24}}>
                    <TextComponent title size={typography.fontSizeExtraLarge} text='Invite Friend'/>
                    <SpaceComponent height={7}/>
                    <InputComponent 
                    styles={{borderRadius:100}}
                    placeholder='Search'
                    value={search} 
                    onChange={(val) => setSearch(val)} 
                    suffix={
                      <SearchNormal1 
                        size="22" 
                        color={colors.primary} />
                    }
                    />
                  </View>
                }
                FooterComponent={
                    <View style={{paddingVertical:30,paddingHorizontal:35}}>
                        <ButtonComponent
                          onPress={handleInvite}
                          style={[globalStyles.btnPrimary,{
                            padding:19
                          }]} 
                          textStyle={[globalStyles.btnPrimaryText,{
                            fontSize:typography.fontSizeMedium,
                            fontFamily:typography.fontFamily.medium
                          }]}
                          iconFlex='right'
                          icon={<ArrowRight style={{ position: 'absolute', right: 16 }} />}
                          type='primary' 
                          text={`Invite`.toUpperCase()} 
                        />
                    </View>
                }
            >
              <ScrollView style={{flex:1,paddingHorizontal:20,paddingVertical:5}}>
                   {filteredFriends.map((friend) => (<UserComponent checked={userSelected.includes(friend._id)} key={randomUUID()} userInfo={friend} onPress={()=>handleUserSelected(friend._id)}/>))}
              </ScrollView>
            </Modalize>
    </Portal>
    <LoadingModal visible={isLoading}/>
    </>
  )
}

export default ModalizeInvite