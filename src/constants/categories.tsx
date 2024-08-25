import React, { ReactNode } from 'react';
import {FontAwesome,Ionicons} from '@expo/vector-icons';
import { ChefForkSVG } from 'assets/svgs';
import { colors } from '~/styles';
export interface Category {
    key: string;
    title: string;
    icon: ReactNode;
    iconColor: string;
}
export const Categories = (isColor?:boolean): Category[] => {
    return [
        {
          key: '1',
          icon: (
            <Ionicons
              name="basketball"
              size={22}
              color={isColor ? colors.white : '#EE544A'}
            />
          ),
          iconColor: '#EE544A',
          title: 'Sports',
        },
        {
          key: '2',
          icon: (
            <FontAwesome
              name="music"
              size={22}
              color={isColor ? colors.white : '#F59762'}
            />
          ),
          iconColor: '#F59762',
          title: 'Music',
        },
        {
          key: '3',
          icon: <ChefForkSVG color={isColor ? colors.white : '#29D697'} />,
          iconColor: '#29D697',
          title: 'Food',
        },
        {
          key: '4',
          icon: (
            <Ionicons
              name="color-palette-sharp"
              size={22}
              color={isColor ? colors.white : '#46CDFB'}
            />
          ),
          iconColor: '#46CDFB',
          title: 'Art',
        },
    ]
}