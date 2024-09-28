import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import { appInfo, colors, typography } from '~/styles';
import AvatarGroup from './AvatarGroup';
import RowComponent from './RowComponent';
import { Data, Location } from 'iconsax-react-native';
import SpaceComponent from './SpaceComponent';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { endAt } from 'firebase/firestore';
import { EventModel } from '~/models';
import { TextHelper } from '~/utils/text';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
interface Props {
  item: EventModel;
  type: 'card' | 'list' | 'list-short';
}


const EventItem: React.FC<Props> = ({ item, type = 'card' }) => {

  const navication: any = useNavigation()

  const { user: { _id, followedEvents } } = useSelector((state: RootState) => state.auth)
  const isFollowers = item?._id && followedEvents && followedEvents.includes(item._id) ? true : false



  switch (type) {
    case 'card':
      return (
        <CardComponent
          styles={{ width: appInfo.size.WIDTH * 0.6 }}
          isShadow
          onPress={() => navication.navigate('EventDetail', { item })}
        >
          <ImageBackground
            style={{
              padding: 8,
              borderRadius: 12,
              overflow: 'hidden',
              height: 131,
            }}
            source={{ uri: item.imageUrl ?? require('../../assets/images/event-image.png') }}
            imageStyle={{
              resizeMode: 'cover'
            }}
          >
            <RowComponent justify='space-between' align='flex-start'>
              <CardComponent
                color='#ffffffB3'
                styles={{ alignItems: 'center', margin: 0, paddingHorizontal: 6, paddingVertical: 3, width: 45, height: 45 }}>
                <TextComponent text={TextHelper.formatDateTime(new Date(item.date), 'dd')} title size={18} font={typography.fontFamily.bold} color='#F0635A' />
                <TextComponent text={TextHelper.formatDateTime(new Date(item.date), 'MMMM').slice(0, 5)} title size={10} color='#F0635A' />
              </CardComponent>
              {
                isFollowers && (
                  <CardComponent
                    color='#ffffffB3'
                    styles={{ alignItems: 'center', margin: 0, padding: 8 }}>
                    <MaterialIcons name="bookmark" size={20} color="#F0635A" />
                  </CardComponent>
                )
              }
            </RowComponent>
          </ImageBackground>
          <SpaceComponent height={14} />
          <View style={{ paddingHorizontal: 7, paddingBottom: 8, paddingTop: 0 }}>
            <TextComponent numOfLine={1} text={item.title} title size={18} />
            <SpaceComponent height={10} />
            <AvatarGroup users={item.users} />
            <SpaceComponent height={10} />
            <RowComponent>
              <Location size={18} color={colors.text3} variant='Bold' />
              <SpaceComponent width={8} />
              <TextComponent flex={1} numOfLine={1} text={item.location.address} size={12} color={colors.text2} />
            </RowComponent>
          </View>
        </CardComponent>
      )
    case 'list':
      return (
        <RowComponent
          onPress={() => navication.navigate('EventDetail', { item })}
          styles={{ backgroundColor: colors.white, paddingHorizontal: 9, paddingVertical: 7, borderRadius: 16 }}>
          <Image source={{ uri: item.imageUrl }} style={{ width: 79, height: '100%', borderRadius: 10 }} resizeMode='cover' />
          <SpaceComponent width={17} />
          <View style={{ flex: 1 }}>
            <RowComponent justify='space-between'>
              <TextComponent size={typography.fontSizeSmall} color={colors.primary} text={`${TextHelper.formatDateTime(new Date(item.date), 'ddd MMMM, yy')} - ${TextHelper.formatDateTime(new Date(item.startAt), 'hh:mm a')}`} />
              {
                isFollowers && (<CardComponent
                  color='#ffffffB3'
                  styles={{ alignItems: 'center', margin: 0, padding: 0 }}>
                  <MaterialIcons name="bookmark" size={20} color="#F0635A" />
                </CardComponent>)
              }
            </RowComponent>
            <SpaceComponent height={4} />
            <TextComponent numOfLine={2} text={item.title} title size={15} />
            <SpaceComponent height={7} />
            <RowComponent>
              <Location size={18} color={colors.text3} variant='Bold' />
              <SpaceComponent width={8} />
              <TextComponent flex={1} numOfLine={1} text={item.location.address} size={typography.fontSizeSmall} color={colors.text2} />
            </RowComponent>
          </View>
        </RowComponent>
      )
    case 'list-short':
      return (
        <RowComponent
          onPress={() => navication.navigate('EventDetail', { item })}
          styles={{ backgroundColor: colors.white, paddingHorizontal: 9, paddingVertical: 7, borderRadius: 16 }}>
          <Image source={{ uri: item.imageUrl }} style={{ width: 79, height: 92, borderRadius: 10 }} resizeMode='cover' />
          <SpaceComponent width={17} />
          <View style={{ flex: 1 }}>
            <RowComponent justify='space-between'>
              <TextComponent size={typography.fontSizeSmall} color={colors.primary} text={`${TextHelper.formatDateTime(new Date(item.date), 'ddd MMMM, yy')} - ${TextHelper.formatDateTime(new Date(item.startAt), 'hh:mm a')}`} />
              {
                isFollowers && (<CardComponent
                  color='#ffffffB3'
                  styles={{ alignItems: 'center', margin: 0, padding: 0 }}>
                  <MaterialIcons name="bookmark" size={20} color="#F0635A" />
                </CardComponent>)
              }
            </RowComponent>
            <SpaceComponent height={4} />
            <TextComponent numOfLine={2} text={item.title} title size={15} />
          </View>
        </RowComponent>
      )
    default:
      return (
        <CardComponent
          styles={{ width: appInfo.size.WIDTH * 0.6 }}
          isShadow
          onPress={() => navication.navigate('EventDetail', { item })}
        >
          <ImageBackground
            style={{
              padding: 8,
              borderRadius: 12,
              overflow: 'hidden',
              height: 131,
            }}
            source={{ uri: item.imageUrl ?? require('../../assets/images/event-image.png') }}
            imageStyle={{
              resizeMode: 'cover'
            }}
          >
            <RowComponent justify='space-between' align='flex-start'>
              <CardComponent
                color='#ffffffB3'
                styles={{ alignItems: 'center', margin: 0, paddingHorizontal: 6, paddingVertical: 3, width: 45, height: 45 }}>
                <TextComponent text={TextHelper.formatDateTime(new Date(item.date), 'dd')} title size={18} font={typography.fontFamily.bold} color='#F0635A' />
                <TextComponent text={TextHelper.formatDateTime(new Date(item.date), 'MMMM').slice(0, 5)} title size={10} color='#F0635A' />
              </CardComponent>
              {
                isFollowers && (
                  <CardComponent
                    color='#ffffffB3'
                    styles={{ alignItems: 'center', margin: 0, padding: 8 }}>
                    <MaterialIcons name="bookmark" size={20} color="#F0635A" />
                  </CardComponent>
                )
              }
            </RowComponent>
          </ImageBackground>
          <SpaceComponent height={14} />
          <View style={{ paddingHorizontal: 7, paddingBottom: 8, paddingTop: 0 }}>
            <TextComponent numOfLine={1} text={item.title} title size={18} />
            <SpaceComponent height={10} />
            <AvatarGroup users={item.users} />
            <SpaceComponent height={10} />
            <RowComponent>
              <Location size={18} color={colors.text3} variant='Bold' />
              <SpaceComponent width={8} />
              <TextComponent flex={1} numOfLine={1} text={item.location.address} size={12} color={colors.text2} />
            </RowComponent>
          </View>
        </CardComponent>
      )
  }

}

export default EventItem