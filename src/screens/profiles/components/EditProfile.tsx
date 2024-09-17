import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TextComponent } from '~/components'
import {Feather} from '@expo/vector-icons';
import { colors, typography } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
const EditProfile = () => {
  return (
    <SectionComponent>
        <ButtonComponent
            style={{alignSelf:'center'}}  
            type='ouline'
            icon={
                <Feather name="edit" size={24} color={colors.primary} />
            }
            iconFlex='left'
            text='Edit Profile'
            textStyle={{
                color:colors.primary,
                fontSize:typography.fontSizeMedium,
                fontFamily:typography.fontFamily.regular
            }}
        />
        <SpaceComponent height={25}/>
        <TabBarComponent title ='About Me'/>
        <Text style={{
            fontFamily:typography.fontFamily.regular,
            fontSize:typography.fontSizeMedium,
            lineHeight:25,
            color:colors.text,
           
        }}>
            Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.
            <TouchableOpacity 
            onPress={()=>console.log('Read More')}
            >
                    <TextComponent 
                        size={typography.fontSizeMedium}
                        font={typography.fontFamily.regular}
                        color={colors.primary}
                        text=' Read More'
                    />
            </TouchableOpacity>
        </Text>
         <SpaceComponent height={20}/>
        <TabBarComponent 
            title ='Interest'
            onPress={()=> console.log('Change')}
            rightTouchable={
                <RowComponent>
                    <Feather name="edit-3" size={16} color={colors.primary} />
                    <SpaceComponent width={5}/>
                    <TextComponent 
                        size={typography.fontSizeSmall}
                        font={typography.fontFamily.medium}
                        color={colors.primary}
                        text={`${'Change'.toUpperCase()}`} 
                    />
                </RowComponent>
            }
        />
    </SectionComponent>
  )
}

export default EditProfile