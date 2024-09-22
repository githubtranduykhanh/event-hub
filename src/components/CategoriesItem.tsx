import { View, Text } from 'react-native'
import React from 'react'
import { Category, renderIconCategories } from '~/constants/categories'
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import SpaceComponent from './SpaceComponent';
import { colors, globalStyles } from '~/styles';
import { CategoryModel } from '~/models/CategoryModel';

interface CategoriesItemProps {
    item: CategoryModel;
    isColor?:boolean;
    isShadowBox?:boolean;
}

const CategoriesItem: React.FC<CategoriesItemProps> = ({ item,isColor,isShadowBox }) => {
    return (
      <RowComponent styles={
        [globalStyles.tag,isShadowBox && globalStyles.shadowBox,{
            backgroundColor:isColor ? item.iconColor : colors.white
        }]
      }>
        {renderIconCategories(item.iconLibrary, item.iconName, item.iconSize, item.iconColor,isColor)}
        <SpaceComponent width={8} />
        <TextComponent text={item.title} color={isColor ? colors.white : colors.gray} />
      </RowComponent>
    );
  };

export default CategoriesItem