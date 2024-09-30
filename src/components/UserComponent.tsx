import { View, Text } from 'react-native'
import React from 'react'
import { IUserProfile } from '~/models/UserModel'
import RowComponent from './RowComponent';
import AvatarComponent from './AvatarComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import { colors, typography } from '~/styles';
import { NumberHelper } from '~/utils/number';

import { AntDesign } from '@expo/vector-icons';
interface IProps {
    userInfo: IUserProfile;
    onPress: () => void;
    type?:'Notification' | 'Invite'
    checked?:boolean
}


const UserComponent: React.FC<IProps> = ({ userInfo, onPress,type = 'Notification',checked }) => {
    return type === 'Notification' ? (
        <RowComponent styles={{ marginBottom: 16 }} onPress={onPress}>
            <RowComponent styles={{ flex: 1 }}>
                <AvatarComponent size={45} fullName={userInfo.fullName} photoUrl={userInfo.photoUrl} />
                <SpaceComponent width={11} />
                <View>
                    <TextComponent
                        text={userInfo.fullName ?? userInfo.email}
                        size={typography.fontSizeSmall}
                        font={typography.fontFamily.medium}
                    />
                    <TextComponent
                        text={`${NumberHelper.formatLargeNumber(userInfo.followers?.length ?? 0)} Follwers`}
                        size={13}
                    />
                </View>
            </RowComponent>
            <AntDesign name="checkcircle" size={20} color={checked ? colors.primary : colors.gray5} />
        </RowComponent>
    )
    :(
        <RowComponent styles={{ marginBottom: 16 }}>
            <RowComponent styles={{ flex: 1 }}>
                <AvatarComponent size={45} fullName={userInfo.fullName} photoUrl={userInfo.photoUrl} />
                <SpaceComponent width={11} />
                <View>
                    <TextComponent
                        text={userInfo.fullName ?? userInfo.email}
                        size={typography.fontSizeSmall}
                        font={typography.fontFamily.medium}
                    />
                    <TextComponent
                        text={`${NumberHelper.formatLargeNumber(userInfo.followers?.length ?? 0)} Follwers`}
                        size={13}
                    />
                </View>
            </RowComponent>
            <AntDesign name="checkcircle" size={20} color={colors.primary} />
        </RowComponent>
    )
}

export default UserComponent