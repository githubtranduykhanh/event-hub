import { View, Text, FlatList, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Categories } from '~/constants/categories';
import CategoriesItem from './CategoriesItem';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
    isColor?:boolean;
    styles?:StyleProp<ViewStyle>;
    isShadowBox?:boolean;
}


const CategoriesList:React.FC<Props> = ({isColor,styles,isShadowBox}) => {

  return (
    <FlatList
        style={[{paddingHorizontal: 16,paddingLeft:0},styles]}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={Categories(isColor)}
        renderItem={({item}) => <RowComponent>
            <CategoriesItem item={item} isColor={isColor} isShadowBox={isShadowBox}/>
            <SpaceComponent width={11}/>
        </RowComponent>}
    />
  )
}

export default CategoriesList