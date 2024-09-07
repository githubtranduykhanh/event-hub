import { View, Text, ImageBackground, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { EventModel } from '~/models';
import { AvatarGroup, ButtonComponent, CardComponent, ContainerComponent, HeaderComponent, RowComponent, SpaceComponent, TabBarComponent, TextComponent } from '~/components'
import { colors, globalStyles, typography } from '~/styles'
import {MaterialIcons} from '@expo/vector-icons';
import { Calendar,Location } from 'iconsax-react-native';
import ArrowRight from '../../../assets/svgs/arrow-right.svg'
import { LinearGradient } from 'expo-linear-gradient';


const EventDetail = ({navigation,route}:any) => {
  const {item} = route.params

  return (
    
    <ContainerComponent isSafeAreaView={false}>
      <ImageBackground 
        style={{height:244,zIndex:1}}
        resizeMode='cover'
        source={require('../../../assets/images/image-bg-event-detail.png')}>
        <SafeAreaView style={{flex:1}}>
          <HeaderComponent color={colors.white} back title='Event Details' 
            icon={<CardComponent 
              color='rgba(255, 255, 255, 0.30)'
              styles={{alignItems:'center',margin:0,marginBottom:0,padding:10,borderRadius:10}}>
                <MaterialIcons name="bookmark" size={20} color={colors.white} />
            </CardComponent>}
          />
          <RowComponent 
          justify='space-between'
          styles={
            [globalStyles.shadowBottom,{
              backgroundColor:colors.white,
              position:'absolute',
              bottom:-30,
              left:40,
              paddingHorizontal:14,
              paddingVertical:13,
              borderRadius:30,
              width:295,
            }]
          }>
            <AvatarGroup textSize={15} imageSize={34}/>
            <ButtonComponent style={{paddingHorizontal:18,paddingVertical:6,borderRadius:7}} textFont={typography.fontFamily.regular} textSize={12} text={'Invite'.toUpperCase()} type='primary'/>
          </RowComponent>
        </SafeAreaView>     
      </ImageBackground>
      <ScrollView 
      showsVerticalScrollIndicator={false}
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
              <TextComponent title size={16} lineHeight={34} text='14 December, 2021'/>
              <TextComponent size={12} color={colors.subColor} text='Tuesday, 4:00PM - 9:00PM'/>
            </View>
          </RowComponent>
          <SpaceComponent height={18}/>
          <RowComponent align='center'>
            <CardComponent styles={{margin:0,marginBottom:0,marginTop:5}} color={`${colors.primary}4D`}>
              <Location size={30} variant='Bold' color={colors.primary} />
            </CardComponent>
            <SpaceComponent width={14}/>
            <View style={{flex:1}}>
              <TextComponent title size={16} lineHeight={34} text='Gala Convention Center'/>
              <TextComponent size={12} color={colors.subColor} text='36 Guild Street London, UK'/>
            </View>
          </RowComponent>
          <SpaceComponent height={18}/>
          <RowComponent justify='space-between' align='center'>
            <RowComponent styles={{flex:1}}>
              <Image style={{
                width:44,
                height:44,
                borderRadius:12
              }} source={{uri:item.imageUrl}} resizeMode='cover' />
              <SpaceComponent width={14}/>
              <View style={{flex:1}}>
                <TextComponent font={typography.fontFamily.medium} size={15} lineHeight={25} text='Gala Convention Center'/>
                <TextComponent size={12} color={colors.subColor} text='36 Guild Street London, UK'/>
              </View>
            </RowComponent>
            <ButtonComponent 
              style={{paddingHorizontal:18,paddingVertical:6,borderRadius:7}} 
              color={`${colors.primary}4D`}
              textColor={colors.primary}
              textFont={typography.fontFamily.medium} 
              textSize={12} 
              text={'Follow'} 
              type='primary'
            />
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
              width:271,
              alignSelf:'center',
              height:58,
              zIndex:2
            }}
            iconFlex='right'
            textStyle={{ textAlign: 'center', marginRight: 0 }}
            icon={<ArrowRight style={{ position: 'absolute', right: 16 }} />}
            text={'Buy Ticket $120'.toUpperCase()} 
            type='primary'
          />
      </LinearGradient>
    </ContainerComponent>
  )
}

export default EventDetail