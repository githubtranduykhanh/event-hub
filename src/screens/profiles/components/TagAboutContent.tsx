import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Tag } from 'iconsax-react-native';
import { TagProfileAbout } from '~/constants/types';
import { IUserProfile } from '~/models/UserModel';
import { colors, typography } from '~/styles';
import { TextHelper } from '~/utils/text';
import { EventItem, SpaceComponent, TextComponent } from '~/components';
import { EventModel } from '~/models';
import { randomUUID } from 'expo-crypto';

interface IProps {
    tagSelected: string;
    userProfile:IUserProfile;
}


const TagAboutContent: React.FC<IProps> = ({ tagSelected,userProfile }) => {
    switch (tagSelected) {
        case 'about':
            return (
                <View>
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
                </View>
            )
        case 'event':
            return (
                <View style={{flex:1}}>
                    <FlatList                     
                        data={userProfile.followedEvents}
                        keyExtractor={(item) => item._id ?? randomUUID()}
                        renderItem={({ item }) => <EventItem item={item} type='list'/>}
                    />
                </View>
            )
        case 'reviews':
            return (
                <>
                </>
            )

        default:
            return (<></>);
    }

}

export default TagAboutContent