import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Categories } from '~/constants/categories';
import CategoriesItem from './CategoriesItem';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
    isColor?:boolean;
}


const CategoriesList:React.FC<Props> = ({isColor}) => {

  return (
    <FlatList
        style={{paddingHorizontal: 16}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={Categories(isColor)}
        renderItem={({item}) => <RowComponent>
            <CategoriesItem item={item} isColor={isColor}/>
            <SpaceComponent width={11}/>
        </RowComponent>}
    />
  )
}

export default CategoriesList