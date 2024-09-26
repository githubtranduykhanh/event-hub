import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TagComponent, TextComponent } from '~/components'
import {Feather} from '@expo/vector-icons';
import { colors, typography } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Tag } from 'iconsax-react-native';
import { randomUUID } from 'expo-crypto';
import { useNavigation } from '@react-navigation/native';
import { IUserProfile } from '~/models/UserModel';
import { ModalizeSelect } from '~/modals';
import { apiGetCategories, apiPutInterestProfileUser } from '~/apis';
import { ApiHelper } from '~/apis/helper';
import { CategoryModel } from '~/models/CategoryModel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, appSelector, profileSelector } from '~/redux/store';
import { interestProfileUser } from '~/redux/features/profile/profileActions';
import { TextHelper } from '~/utils/text';

interface IProps{
    userProfile:IUserProfile
}

const EditProfile:React.FC<IProps> = ({userProfile}) => {
    const {categories} = useSelector(appSelector)
    const navigation:any =  useNavigation()
    const dispatch = useDispatch<AppDispatch>();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState<string[]>(userProfile.interests??[]);
   
    useEffect(()=>{
        if(userProfile.interests) setSelected(userProfile.interests)
    },[userProfile.interests])


    const hanldeOnSelectedInterest = (val:string[]) => {
        dispatch(interestProfileUser({interests:val}))
    }


    return (
    <SectionComponent>
        <ButtonComponent
            onPress={() => navigation.navigate('Profile', {
                screen: 'EditProfileScreen',
                params:{
                    profile:userProfile
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
            {userProfile.bio && TextHelper.limitStringLength(userProfile.bio,0,50)}           
            {userProfile.bio && userProfile.bio?.length > 50 
            && (<TouchableOpacity 
            onPress={()=>console.log('Read More')}
            >
                    <TextComponent 
                        size={typography.fontSizeMedium}
                        font={typography.fontFamily.regular}
                        color={colors.primary}
                        text=' Read More'
                    />
            </TouchableOpacity>)}
        </Text>
         <SpaceComponent height={20}/>
        <TabBarComponent 
            title ='Interest'
            onPress={()=> console.log('Change')}
            rightTouchable={
                <RowComponent
                onPress={()=> setModalVisible(true)}
                >
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
            {categories && categories.filter((category) => userProfile.interests?.includes(category.key)).map(interes => (
                <TagComponent 
                    bgColor={interes.iconColor}
                    key={randomUUID()} 
                    lable={interes.title} 
                    textSize={13} 
                    textFont={typography.fontFamily.medium} 
                    styles={{marginRight:5,marginBottom:5,paddingHorizontal:15,paddingVertical:7}}
                />
            ))}
        </RowComponent>
        <ModalizeSelect 
            visible={isModalVisible} 
            values={categories.map(item => ({lable:item.title,value:item.key}))}
            selected={selected}
            multible
            onClose={()=> setModalVisible(false)}
            onSelect={hanldeOnSelectedInterest}
            setSelected={setSelected}
        />
        
    </SectionComponent>
  )
}

export default EditProfile