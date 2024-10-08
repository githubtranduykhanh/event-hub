import { View, Text, Button, SafeAreaView, TouchableOpacity, ScrollView, FlatList, ImageBackground, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import { removeAuth } from '~/redux/features/auth/authSlice'
import { removeFromStorage } from '~/utils/storage'
import { colors, globalStyles, typography } from '~/styles'

import { ButtonComponent, CategoriesList, CircleComponent, EventItem, LoadingComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TagComponent, TextComponent } from '~/components'
import { MenuSVG } from 'assets/svgs'
import { AntDesign } from '@expo/vector-icons';
import { Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import { itemEvent } from '~/constants/events'
import * as Location from 'expo-location';
import { AddressModel } from '~/models/AddressModel'
import { addRegion } from '~/redux/features/app/appSlice'
import { LoadingModal } from '~/modals'
import { apiGetEvents } from '~/apis'
import { ApiHelper } from '~/apis/helper'
import { EventModel } from '~/models'
import { TextHelper } from '~/utils/text'
import { useStatusBar } from '~/hooks'


interface ItemLoadingComponent {
  isLoading: boolean;
  mes: string;
}

interface LoadingComponent {
  upcomingEvents: ItemLoadingComponent;
  nearbyEvents: ItemLoadingComponent;
}

const initLoadingComponent: LoadingComponent = {
  upcomingEvents: {
    isLoading: false,
    mes: 'Data upcoming not found !'
  },
  nearbyEvents: {
    isLoading: false,
    mes: 'Data nearby not found !'
  }
}

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  useStatusBar('light-content')
  const { fullName, email, photoUrl, _id } = useSelector((state: RootState) => state.auth.user)
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationGeocodedAddress | null>(null);
  const [isLoadingComponent, setIsLoadingComponent] = useState<LoadingComponent>(initLoadingComponent)
  const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<EventModel[]>([]);
  const handleLogout = async () => {
    await removeFromStorage('auth')
    dispatch(removeAuth())
  }


  const handleSearchOrFilters = (isFilter: boolean) => {
    navigation.navigate('SearchEvents', {
      isFilter
    })
  }


  useEffect(() => {
   
    const updatedUpcomingEvents = upcomingEvents.map((event) => {
      
      if (event.authorId === _id && event.author) {
        return {
          ...event,
          author: {
            ...event.author, 
            fullName,        
            email,           
            photoUrl        
          }
        };
      }
      return event; 
    });

    
    const updatedNearbyEvents = nearbyEvents.map((event) => {
      if (event.authorId === _id && event.author) {
        return {
          ...event,
          author: {
            ...event.author,
            fullName,
            email,
            photoUrl
          }
        };
      }
      return event;
    });


    
    if (updatedUpcomingEvents.length > 0) {
      setUpcomingEvents(updatedUpcomingEvents);
    }

    
    if (updatedNearbyEvents.length > 0) {
      setNearbyEvents(updatedNearbyEvents);
    }
  }, [fullName, email, photoUrl])

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const currentPosition = await Location.getCurrentPositionAsync({});
      if (currentPosition) {
        setLocation(currentPosition)
        await reverseGeocode(currentPosition)
      }
    })();

    (async () => {
      setIsLoadingComponent(prve => ({ ...prve, upcomingEvents: { ...prve.upcomingEvents, isLoading: true } }))
      try {
        const res = await apiGetEvents({
          author: true,
          limit: 5,
          'date[gte]': new Date().toISOString(),
        })
        const data = await res.data
        if (data.status && data.data && data.data.length > 0) setUpcomingEvents(data.data)
      } catch (error) {
        console.log(ApiHelper.getMesErrorFromServer(error))
      } finally {
        setIsLoadingComponent(prev => ({
          ...prev,
          upcomingEvents: { ...prev.upcomingEvents, isLoading: false },
        }))
      }
    })();
  }, []);



  useEffect(() => {
    
    (async () => {
      
      if (location) {
        setIsLoadingComponent(prve => ({ ...prve, nearbyEvents: { ...prve.nearbyEvents, isLoading: true } }))
        try {
          const res = await apiGetEvents({
            author: true,
            limit: 5,
            'date[gte]': new Date().toISOString(),
            lat: location?.coords.latitude,
            lng: location?.coords.longitude,
            distance: 5
          })
          const data = await res.data
          if (data.status && data.data && data.data.length > 0) setNearbyEvents(data.data)
        } catch (error) {
          console.log(ApiHelper.getMesErrorFromServer(error))
        } finally {
          setIsLoadingComponent(prev => ({
            ...prev,
            nearbyEvents: { ...prev.nearbyEvents, isLoading: false },
          }))
        }
      }
    })();
  }, [location]);

  const reverseGeocode = async (currentPosition: Location.LocationObject) => {
    if (currentPosition) {
      try {
        const reverseGeocode: Location.LocationGeocodedAddress[] = await Location.reverseGeocodeAsync({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude
        });
        dispatch(addRegion({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
          ...reverseGeocode[0]
        }))
        setCurrentLocation(reverseGeocode[0])
      } catch (error) {
        console.error('Error with reverse geocoding:', error);
      }
    }
  }

  const handelEvent = async () => {
    try {
      console.log(TextHelper.formatDateTime(new Date('2024-01-14T08:55:00.000Z'), 'ddd MMMM, yy'))
      const res = await apiGetEvents({
        categories: 'food'
      })
      const data = await res.data
      console.log('categoriesfood==========')
      data.data?.forEach((item) => {
        console.log(item.date)
      })

    } catch (error) {
      console.log(ApiHelper.getMesErrorFromServer(error))
    }
  }
  return (
    <>
      <View style={[globalStyles.container]}>
        
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
          <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{
              height: 136,
              backgroundColor: colors.primary,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30
            }}>
              <SectionComponent styles={{ paddingHorizontal: 24, paddingBottom: 0 }}>
                <RowComponent justify='space-between'>
                  <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingVertical: 5, paddingRight: 5 }}>
                    <MenuSVG color={colors.white} fontSize={typography.fontSizeExtraLarge} />
                  </TouchableOpacity>
                  <View>
                    <RowComponent>
                      <TextComponent text='Current Location' size={typography.fontSizeSmall} color={colors.white2} />
                      <SpaceComponent width={4} />
                      <AntDesign name="caretdown" size={11} color={colors.white} />
                    </RowComponent>
                    <TextComponent style={{ textAlign: 'center' }} text={currentLocation ? `${currentLocation.city}, ${currentLocation.isoCountryCode}` : 'New Yourk, USA'} font={typography.fontFamily.medium} color={colors.white} />
                  </View>
                  <CircleComponent size={36} color='#5D56F3' onPress={handelEvent}>
                    <View>
                      <Notification size={typography.fontSizeExtraLarge} variant='Outline' color={colors.white} />
                      <View style={{
                        backgroundColor: '#02E9FE',
                        position: 'absolute',
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: '#5D56F3',
                        top: 2,
                        right: 2,
                        width: 10,
                        height: 10,
                      }}>
                      </View>
                    </View>
                  </CircleComponent>
                </RowComponent>
                <SpaceComponent height={20} />
                <RowComponent>
                  <RowComponent
                    styles={{ flex: 1 }}
                    onPress={() => handleSearchOrFilters(false)}
                  >
                    <SearchNormal1 variant='TwoTone' size={24} color={colors.white} />
                    <RowComponent styles={{ opacity: 0.3 }}>
                      <View style={{ width: 1, backgroundColor: colors.white, height: 24, marginLeft: 10, marginRight: 7 }} />
                      <TextComponent text='Search...' flex={1} color={colors.white} size={typography.fontSizeLarge} />
                    </RowComponent>
                  </RowComponent>
                  <TagComponent
                    onPress={() => handleSearchOrFilters(true)}
                    lable='Filters'
                    icon={<CircleComponent size={23} color='#B1AEFA'>
                      <Sort size={typography.fontSizeMedium} variant='Outline' color='#5D56F3' />
                    </CircleComponent>}
                  />
                </RowComponent>
              </SectionComponent>
              <SpaceComponent height={15} />
              <CategoriesList isColor isShadowBox styles={
                {
                  position: 'absolute',
                  bottom: -18,
                  left: 24,
                }
              } />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1, marginHorizontal: 24, marginTop: 18 }}
            >
              <SpaceComponent height={20} />
              <TabBarComponent title='Upcoming Events' onPress={() => navigation.navigate('EventSeeAll',{filter:'Upcoming Events'})} />
              {upcomingEvents.length <= 0
                ? (<LoadingComponent isLoading={isLoadingComponent.upcomingEvents.isLoading} mes={isLoadingComponent.upcomingEvents.mes} />)
                : (<FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={upcomingEvents}
                  renderItem={({ item, index }) => <EventItem item={item} type='card' key={`EventItem-${item._id}`} />}
                />)
              }

              <SpaceComponent height={20} />
              <RowComponent styles={
                {
                  height: 127,
                  backgroundColor: 'rgba(0, 248, 255, 0.25)',
                  overflow: 'hidden',
                  borderRadius: 12,
                  position: 'relative'
                }
              }>
                <View style={{
                  flex: 1,
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  zIndex: 2,
                  padding: 18,
                  paddingTop: 13,
                }}>
                  <TextComponent numOfLine={1} title size={18} lineHeight={34} text={'Invite your friends'} />
                  <TextComponent size={13} text={'Get $20 for ticket'} />
                  <SpaceComponent height={13} />
                  <TouchableOpacity
                    style={[globalStyles.shadow, {
                      backgroundColor: '#00F8FF',
                      borderRadius: 5,
                      paddingHorizontal: 14,
                      paddingVertical: 5,
                      alignSelf: 'flex-start',
                    }]}>
                    <TextComponent size={12} lineHeight={23} text={'Invite'.toUpperCase()} color={colors.white} />
                  </TouchableOpacity>
                </View>
                <Image
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -25,
                    zIndex: 1
                  }}
                  source={require('../../../assets/images/invite.png')}
                  resizeMode='cover'
                />
              </RowComponent>
              <SpaceComponent height={24} />

              <TabBarComponent title='Nearby You' onPress={() => navigation.navigate('EventSeeAll',{filter:'Nearby You'})} />
              {nearbyEvents.length <= 0
                ? (<LoadingComponent isLoading={isLoadingComponent.nearbyEvents.isLoading} mes={isLoadingComponent.nearbyEvents.mes} />)
                : (<FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={nearbyEvents}
                  renderItem={({ item, index }) => <EventItem item={item} type='card' key={`EventItem-${index}`} />}
                />)
              }
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </>
  )
}

export default HomeScreen