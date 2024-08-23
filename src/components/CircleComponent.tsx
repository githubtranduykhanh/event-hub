import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { colors } from '~/styles';

interface Props {
    size?: number;
    children: ReactNode;
    color?: string;
    onPress?: () => void;
    styles?: StyleProp<ViewStyle>
}


const CircleComponent: React.FC<Props> = ({ styles, size, children, color, onPress }) => {


    const locaStyles: StyleProp<ViewStyle> = {
        width: size ?? 40,
        height: size ?? 40,
        backgroundColor: color ?? colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    }

    return onPress 
    ? (<TouchableOpacity onPress={onPress} style={[
        locaStyles,
        styles
    ]}>
        {children}
    </TouchableOpacity>) 
    :(
        <View style={[locaStyles, styles]}>
            {children}
        </View>
    )
}

export default CircleComponent