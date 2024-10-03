import { View, Text } from 'react-native'
import React from 'react'
import { ContainerComponent, SectionComponent, TextComponent } from '~/components'

const EventSeeAll = ({navigation,route}:any) => {
  const {filter}:{filter:string} = route.params
  console.log(filter)
  return (
    <ContainerComponent isScroll back title='Events'>
        <SectionComponent>
            <TextComponent text='EventSeeAll'/>
        </SectionComponent>
    </ContainerComponent>
  )
}

export default EventSeeAll