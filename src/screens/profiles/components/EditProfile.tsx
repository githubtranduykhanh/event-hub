import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TagComponent, TextComponent } from '~/components'
import {Feather} from '@expo/vector-icons';
import { colors, typography } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Tag } from 'iconsax-react-native';
import { randomUUID } from 'expo-crypto';
import { useNavigation } from '@react-navigation/native';
import { IUserProfile } from '~/models/UserModel';

interface IProps {
    profile:IUserProfile
}

const EditProfile:React.FC<IProps> = ({profile}) => {
    const navigation:any =  useNavigation()

  return (
    <SectionComponent>
        <ButtonComponent
            onPress={() => navigation.navigate('Profile', {
                screen: 'EditProfileScreen',
                params:{
                    profile
                }
            })}
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
        <SpaceComponent height={9}/>
        <RowComponent styles={{flexWrap:'wrap'}}>
            {Array.from({length:6}).map((item)=>(
                <TagComponent 
                    key={randomUUID()} 
                    lable='Music' 
                    textSize={13} 
                    textFont={typography.fontFamily.medium} 
                    styles={{marginRight:5,marginBottom:5,paddingHorizontal:15,paddingVertical:7}}
                />
            ))}
        </RowComponent>
    </SectionComponent>
  )
}

export default EditProfile