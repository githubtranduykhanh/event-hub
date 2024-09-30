import { View, Text, ImageBackground, SafeAreaView, ScrollView, Image, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AvatarComponent, AvatarGroup, ButtonComponent, CardComponent, ContainerComponent, HeaderComponent, RowComponent, SpaceComponent, TabBarComponent, TextComponent } from '~/components'
import { colors, globalStyles, typography } from '~/styles'
import {MaterialIcons} from '@expo/vector-icons';
import { Calendar,Location } from 'iconsax-react-native';
import ArrowRight from '../../../assets/svgs/arrow-right.svg'
import { LinearGradient } from 'expo-linear-gradient';
import { EventModel } from '~/models';
import { TextHelper } from '~/utils/text';
import { AppDispatch, RootState,authSelector } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { apiPostFollowersUser, apiPutFollowersEvents } from '~/apis';
import { ApiHelper } from '~/apis/helper';
import { updateUserFollowedEvents, updateUserFollowing } from '~/redux/features/auth/authSlice';
import { LoadingModal, ModalizeInvite } from '~/modals';


const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

const EventDetail = ({navigation,route}:any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [item,setItem] = useState<EventModel>(route.params.item)
  const {user:{_id,followedEvents,following}} = useSelector(authSelector)
  const isUserLength = item.users.length > 0
  const isFollowers = item?._id && followedEvents && followedEvents.includes(item._id) ? true  : false
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [isModalInvite,setIsModalInvite] = useState<boolean>(false)


  useEffect(()=>{
    setItem(route.params.item)
  },[route.params.item])


  const handelFollowers = () => {
    if(item._id) {
      setIsLoading(true)
      apiPutFollowersEvents(item._id)
      .then(res => res.data)
      .then(data => {
        if(data && data.status && data.data) dispatch(updateUserFollowedEvents(data.data))
      })
      .catch(error => console.log(ApiHelper.getMesErrorFromServer(error)))
      .finally(()=>setIsLoading(false))
    }
  }


  const handleFollowAuthor = () => {
    if(item?.author){
      setIsLoading(true)
      apiPostFollowersUser({idFollow:item?.author._id})
      .then((res)=>res.data)
      .then(data => {
        if(data.status && data.data) {
          setItem(prve => prve.author ? ({...prve,author:{...prve.author,followers:data.data?.followUser}}) : prve);
          dispatch(updateUserFollowing(data.data.myFollowingUser))
        }
      })
      .catch((err)=>console.log('apiPostFollowersUser',ApiHelper.getMesErrorFromServer(err)))
      .finally(()=> setIsLoading(false))
    }
  }


  const imageHeight = scrollY.interpolate({
    inputRange: [0, 200], // Adjust the scroll range as needed
    outputRange: [244, 150], // Adjust the height of ImageBackground as needed
    extrapolate: 'clamp',
  });

  
  return (
    
    <>
      
      <ContainerComponent isSafeAreaView={false} statusBarStyle='light'>
      <AnimatedImageBackground 
        style={{zIndex:1,backgroundColor: 'rgba(0, 0, 0, 0.6)', height: imageHeight}}
        resizeMode='cover'
        imageStyle={{opacity:0.5,height:'100%'}}
        source={{uri:item.imageUrl}}>
        <SafeAreaView style={{flex:1}}>
          <HeaderComponent color={colors.white} back title='Event Details'
            icon={
              <CardComponent 
                  onPress={handelFollowers}
                  color={isFollowers ? '#ffffffB3' :'rgba(255, 255, 255, 0.30)'}
                  styles={{alignItems:'center',margin:0,marginBottom:0,padding:10,borderRadius:10}}>
                    <MaterialIcons name="bookmark" size={20} color={isFollowers ? '#F0635A' :colors.white} />
              </CardComponent>
            }
          />
          <RowComponent 
          justify='space-between'
          styles={
            [globalStyles.shadowBottom,{
              backgroundColor:colors.white,
              position:'absolute',
              bottom:isUserLength ? -30 : -33,
              left:40,
              paddingHorizontal:14,
              paddingVertical:13,
              borderRadius:30,
              width:295,
            }]
          }>
            <AvatarGroup users={item.users} textSize={15} imageSize={34}/>
            <ButtonComponent 
              onPress={()=>setIsModalInvite(true)}
              style={{paddingHorizontal:18,paddingVertical:isUserLength ? 6 : 15 ,borderRadius:isUserLength ? 7 : 20,flex:isUserLength ? undefined : 1}} 
              textFont={isUserLength ? typography.fontFamily.regular : typography.fontFamily.bold} 
              textSize={12} 
              text={'Invite'.toUpperCase()} 
              type='primary'/>
          </RowComponent>
        </SafeAreaView>     
      </AnimatedImageBackground>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      style={{
        marginHorizontal:20
      }}>
          <SpaceComponent height={50}/>
          <TextComponent title size={35} font={typography.fontFamily.medium} text={item.title}/>
          <SpaceComponent height={18}/>
          <RowComponent align='center'>
            <CardComponent styles={{margin:0,marginBottom:0,marginTop:5}} color={`${colors.primary}4D`}>
              <Calendar size={30} variant='Bold' color={colors.primary} />
            </CardComponent>
            <SpaceComponent width={14}/>
            <View style={{flex:1}}>
              <TextComponent title size={16} lineHeight={34} text={TextHelper.formatDateTime(new Date(item.date),'dd MMMM, yyyy')}/>
              <TextComponent size={12} color={colors.subColor} text={`${TextHelper.formatDateTime(new Date(item.date),'ddd')}, ${TextHelper.formatDateTime(new Date(item.startAt),'hh:mm a')} - ${TextHelper.formatDateTime(new Date(item.endAt),'hh:mm a')}`}/>
            </View>
          </RowComponent>
          <SpaceComponent height={18}/>
          <RowComponent align='center'>
            <CardComponent styles={{margin:0,marginBottom:0,marginTop:5}} color={`${colors.primary}4D`}>
              <Location size={30} variant='Bold' color={colors.primary} />
            </CardComponent>
            <SpaceComponent width={14}/>
            <View style={{flex:1}}>
              <TextComponent title size={16} lineHeight={34} text={item.location.title}/>
              <TextComponent size={12} color={colors.subColor} text={item.location.address}/>
            </View>
          </RowComponent>
          <SpaceComponent height={18}/>
          <RowComponent justify='space-between' align='center'>
            <RowComponent styles={{flex:1}} onPress={() => navigation.navigate('Profile',{
              screen:'ProfileScreen',
              params:{idUser:item?.author?._id}
            })}>
              {/* <Image style={{
                width:44,
                height:44,
                borderRadius:12
              }} source={{uri:item?.author?.photoUrl}} resizeMode='cover' /> */}
              <AvatarComponent
                size={44}
                borderRadius={12}
                fullName={item.author?.familyName}
                photoUrl={item.author?.photoUrl}
              />
              <SpaceComponent width={14}/>
              <View style={{flex:1}}>
                <TextComponent font={typography.fontFamily.medium} size={15} lineHeight={25} text={item.author?.fullName ?? ''}/>
                <TextComponent size={12} color={colors.subColor} text={item.author?.type ?? 'Individual'}/>
              </View>
            </RowComponent>
            {item?.author && !following?.includes(item?.author?._id)  && <ButtonComponent 
              onPress={handleFollowAuthor}
              style={{paddingHorizontal:18,paddingVertical:6,borderRadius:7}} 
              color={`${colors.primary}4D`}
              textColor={colors.primary}
              textFont={typography.fontFamily.medium} 
              textSize={12} 
              text={'Follow'} 
              type='primary'
            />}
          </RowComponent>
          <SpaceComponent height={23}/>
          <TabBarComponent title='About Event'/>
          <SpaceComponent height={8}/>
          <TextComponent lineHeight={28}  text={item.description}/>
      </ScrollView>

      <LinearGradient 
        colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']}
        style={{
          position:'absolute',
          bottom:0,
          right:0,
          left:0,
          height:100,
        }}> 
          <ButtonComponent 
            style={{         
              position:'absolute',
              bottom:26,
              minWidth:271,
              alignSelf:'center',
              height:58,
              zIndex:2
            }}
            iconFlex='right'
            textStyle={{ textAlign: 'center', marginRight: 25 }}
            icon={<ArrowRight style={{ position: 'absolute', right: 16 }} />}
            text={`Buy Ticket ${TextHelper.formatToVND(+item.price)}`.toUpperCase()} 
            type='primary'
          />
      </LinearGradient>
    </ContainerComponent>
    <LoadingModal visible={isLoading}/>
    <ModalizeInvite visible={isModalInvite} onClose={()=> setIsModalInvite(false)}/>
    </>
  )
}

export default EventDetail