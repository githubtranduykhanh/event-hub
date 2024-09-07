import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import { appInfo, colors, typography } from '~/styles';
import { EventModel } from '~/models';
import AvatarGroup from './AvatarGroup';
import RowComponent from './RowComponent';
import { Location } from 'iconsax-react-native';
import SpaceComponent from './SpaceComponent';
import {MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { endAt } from 'firebase/firestore';
interface Props {
    item:EventModel;
    type:'card' | 'list';
}


const EventItem:React.FC<Props> = ({item,type}) => {

  const navication:any = useNavigation()

  return (
    <CardComponent 
        styles={{width:appInfo.size.WIDTH * 0.6}}
        isShadow
        onPress={()=> navication.navigate('EventDetail',{item: {
          ...item,
          startAt: item.startAt.toISOString(), // Chuyển Date thành chuỗi
          endAt: item.endAt.toISOString(),
          date: item.date.toISOString(),
        },})}
        >
        <ImageBackground 
        style={{
          padding:8,
          borderRadius:12,
          overflow:'hidden',
          height:131,
        }}
        source={require('../../assets/images/event-image.png')}
        imageStyle={{
          resizeMode:'cover'
        }}
        >
          <RowComponent justify='space-between' align='flex-start'>
            <CardComponent 
              color='#ffffffB3'
              styles={{alignItems:'center',margin:0,paddingHorizontal:6,paddingVertical:3,width:45,height:45}}>
              <TextComponent text='10' title size={18} font={typography.fontFamily.bold} color='#F0635A'/>
              <TextComponent text={'June'.toUpperCase()} title size={10} color='#F0635A'/>
            </CardComponent>
            <CardComponent 
            color='#ffffffB3'
            styles={{alignItems:'center',margin:0,padding:8}}>
              <MaterialIcons name="bookmark" size={20} color="#F0635A" />
            </CardComponent>
          </RowComponent>
        </ImageBackground>
        <SpaceComponent height={14}/>
        <View style={{paddingHorizontal:7,paddingBottom:8,paddingTop:0}}>
          <TextComponent numOfLine={1} text={item.title} title size={18} />
          <SpaceComponent height={10}/>
          <AvatarGroup/>
          <SpaceComponent height={10}/>
          <RowComponent>
            <Location size={18} color={colors.text3} variant='Bold'/>
            <SpaceComponent width={8}/>
            <TextComponent flex={1} numOfLine={1} text={item.location.address} size={12} color={colors.text2}/>
          </RowComponent>
        </View>  
    </CardComponent>
  )
}

export default EventItem