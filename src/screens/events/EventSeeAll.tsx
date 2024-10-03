import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { ContainerComponent, SectionComponent, TextComponent } from '~/components'
import { useFocusEffect } from '@react-navigation/native'

const EventSeeAll = ({navigation,route}:any) => {
  const {filter}:{filter:string} = route.params
  console.log(filter)

  useFocusEffect(
    useCallback(() => {
      // Logic hoặc hiệu ứng muốn thực hiện khi màn hình được focus
      console.log('Screen is focused');
      
      // Trả về một hàm để clean-up khi màn hình bị unfocused (tương tự như trong useEffect)
      return () => {
        console.log('Screen is unfocused');
      };
    }, [])
  );


  return (
    <ContainerComponent isScroll back title='Events'>
        <SectionComponent>
            <TextComponent text='EventSeeAll'/>
        </SectionComponent>
    </ContainerComponent>
  )
}

export default EventSeeAll