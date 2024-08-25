import { View, Text } from 'react-native'
import React from 'react'
import { Category } from '~/constants/categories'
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import SpaceComponent from './SpaceComponent';
import { colors, globalStyles } from '~/styles';

interface CategoriesItemProps {
    item: Category;
    isColor?:boolean;
}

const CategoriesItem: React.FC<CategoriesItemProps> = ({ item,isColor }) => {
    return (
      <RowComponent styles={
        [globalStyles.tag,globalStyles.shadowBox,{
            backgroundColor:isColor ? item.iconColor : colors.white
        }]
      }>
        {item.icon}
        <SpaceComponent width={8} />
        <TextComponent text={item.title} color={isColor ? colors.white : colors.gray} />
      </RowComponent>
    );
  };

export default CategoriesItem