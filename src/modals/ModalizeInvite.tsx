import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Modalize } from 'react-native-modalize';
import { AvatarComponent, ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '~/components';
import { Portal } from 'react-native-portalize';
import { colors, globalStyles, typography } from '~/styles';
import { useDebounce } from '~/hooks';
import { SearchNormal1 } from 'iconsax-react-native';
import ArrowRight from '../../assets/svgs/arrow-right.svg'
import { useSelector } from 'react-redux';
import { authSelector } from '~/redux/store';
import { apiGetFriendUser } from '~/apis';
import { ApiHelper } from '~/apis/helper';
import { IUserProfile } from '~/models/UserModel';
import { randomUUID } from 'expo-crypto';
import { NumberHelper } from '~/utils/number';
import {AntDesign} from '@expo/vector-icons';
interface IProps {
  onClose:()=>void;
  visible:boolean;
}
const ModalizeInvite:React.FC<IProps> = ({visible,onClose}) => {
  const {user} = useSelector(authSelector)
  const modalizeRef = useRef<Modalize>(null);
  const [search, setSearch] = useState<string>('')
  const [friends, setFriends] = useState<IUserProfile[]>([])
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
  },[])

  return (
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
                   {friends.map((friend) => (
                      <RowComponent  key={randomUUID()}>
                        <RowComponent styles={{flex:1}}>
                          <AvatarComponent size={45} fullName={friend.fullName} photoUrl={friend.photoUrl}/>
                          <SpaceComponent width={11}/>
                          <View>
                            <TextComponent 
                            text={friend.fullName ?? friend.email}
                            size={typography.fontSizeSmall}
                            font={typography.fontFamily.medium}
                            />
                            <TextComponent 
                              text={`${NumberHelper.formatLargeNumber(friend.followers?.length ?? 0)} Follwers`}
                              size={13}
                            />
                          </View>
                         
                        </RowComponent>
                        <AntDesign name="checkcircle" size={20} color={colors.primary} />
                      </RowComponent>
                    ))}
              </ScrollView>
            </Modalize>
        </Portal>
  )
}

export default ModalizeInvite