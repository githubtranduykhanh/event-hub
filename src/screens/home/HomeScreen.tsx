import { View, Text, Button, SafeAreaView, TouchableOpacity, ScrollView, FlatList, ImageBackground, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import { removeAuth } from '~/redux/features/auth/authSlice'
import { removeFromStorage } from '~/utils/storage'
import { colors, globalStyles, typography } from '~/styles'
import { StatusBar } from 'expo-status-bar'
import { ButtonComponent, CategoriesList, CircleComponent, EventItem, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TagComponent, TextComponent } from '~/components'
import { MenuSVG } from 'assets/svgs'
import { AntDesign } from '@expo/vector-icons';
import { Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import { itemEvent } from '~/constants/events'

const HomeScreen = ({navigation}:any) => {
  const dispatch = useDispatch<AppDispatch>()
  
  const { fullName, email, role } = useSelector((state: RootState) => state.auth.user)

  const handleLogout = async () => {
    await removeFromStorage('auth')
    dispatch(removeAuth())
  }


  const handleSearchOrFilters = (isFilter:boolean) =>{
    navigation.navigate('SearchEvents',{
      isFilter
    })
  }


  return (
    <View style={[globalStyles.container]}>
      <StatusBar style='light' translucent/>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <View style={{
            height: 136,
            backgroundColor: colors.primary,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30
          }}>
            <SectionComponent styles={{paddingHorizontal:24,paddingBottom:0}}>
              <RowComponent justify='space-between'>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={{paddingVertical:5,paddingRight:5}}>
                 <MenuSVG color={colors.white} fontSize={typography.fontSizeExtraLarge} />
                </TouchableOpacity>     
                <View>
                  <RowComponent>
                    <TextComponent text='Current Location' size={typography.fontSizeSmall} color={colors.white2} />
                    <SpaceComponent width={4}/>
                    <AntDesign name="caretdown" size={11} color={colors.white} />
                  </RowComponent>
                  <TextComponent text='New Yourk, USA' font={typography.fontFamily.medium} color={colors.white} />
                </View>
                <CircleComponent size={36} color='#5D56F3'>
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
              <SpaceComponent height={20}/>
              <RowComponent>
                <RowComponent 
                    styles={{flex:1}} 
                    onPress={() => handleSearchOrFilters(false)}
                  >
                  <SearchNormal1 variant='TwoTone' size={24} color={colors.white}/>
                  <RowComponent styles={{opacity:0.3}}>
                    <View style={{width:1,backgroundColor:colors.white,height:24,marginLeft:10,marginRight:7}}/>
                    <TextComponent text='Search...' flex={1} color={colors.white} size={typography.fontSizeLarge}/>
                  </RowComponent>
                </RowComponent>
                <TagComponent 
                  onPress={() => handleSearchOrFilters(true)}
                  lable='Filters' 
                  icon={<CircleComponent size={23} color='#B1AEFA'>
                    <Sort size={typography.fontSizeMedium} variant='Outline' color='#5D56F3'/>
                  </CircleComponent>} 
                />
              </RowComponent>
            </SectionComponent>
            <SpaceComponent height={15}/>
            <CategoriesList isColor styles={
              {
                position:'absolute',
                bottom:-18,
                left:24,
              }
            }/>
          </View>         
          <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{ flex: 1,marginHorizontal:24,marginTop:18}}
            >
            <SpaceComponent height={20}/>  
            <TabBarComponent title='Upcoming Events' onPress={()=>{}}/>
            <FlatList               
              showsHorizontalScrollIndicator={false}
              horizontal 
              data={Array.from({length:5})}
              renderItem={({item,index}) => <EventItem item={itemEvent} type='card' key={`EventItem-${index}`} />}
            />

            <SpaceComponent height={20}/>
            <RowComponent styles={
              {
                height:127,
                backgroundColor:'rgba(0, 248, 255, 0.25)',
                overflow:'hidden',
                borderRadius:12,
                position:'relative'              
              }
            }>
                <View style={{
                  flex:1,               
                  position:'absolute',     
                  top:0,
                  bottom:0,
                  right:0,
                  left:0,
                  zIndex:2,
                  padding:18,
                  paddingTop:13,
                }}>
                      <TextComponent numOfLine={1} title size={18} lineHeight={34} text={'Invite your friends'}/>
                      <TextComponent size={13} text={'Get $20 for ticket'}/>
                      <SpaceComponent height={13}/>
                      <TouchableOpacity 
                      style={[globalStyles.shadow,{
                        backgroundColor:'#00F8FF',
                        borderRadius:5,
                        paddingHorizontal:14,
                        paddingVertical:5,
                        alignSelf:'flex-start',
                      }]}>
                        <TextComponent size={12} lineHeight={23} text={'Invite'.toUpperCase()} color={colors.white}/>
                      </TouchableOpacity>                
                </View>
                <Image 
                style={{
                  position:'absolute',
                  top:-5,
                  right:-25,
                  zIndex:1
                }}
                source={require('../../../assets/images/invite.png')} 
                resizeMode='cover'
                />              
            </RowComponent>
            <SpaceComponent height={24}/>

            <TabBarComponent title='Nearby You' onPress={()=>{}}/>
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal 
              data={Array.from({length:5})}
              renderItem={({item,index}) => <EventItem item={itemEvent} type='card' key={`EventItem-${index}`} />}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen