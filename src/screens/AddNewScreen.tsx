import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { EventConstanst, initEvent } from '~/constants/events'
import { ButtonComponent, ChoiceLocation, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '~/components'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'


const AddNewScreen = () => {
  const {id} = useSelector((state:RootState) => state.auth.user)
  const [eventData, setEventData] = useState<EventConstanst>({...initEvent,authorId:id})


  const handleChangeValue = (key:string, value:string) => {
    setEventData(prve => ({...prve,[key]:value}))
  }

  const handleAddNew = () => {
    console.log(eventData)
  }
  
  return (
    <ContainerComponent isScroll>
      <StatusBar style='dark' />
      
      <SectionComponent>
        <TextComponent title text='Add New'/>
      </SectionComponent>
      <SectionComponent>
        <InputComponent  allowClear placeholder='Title' value={eventData.title} onChange={(val) => handleChangeValue('title',val)}/>
        <SpaceComponent height={15}/>
        <InputComponent 
          multiline 
          numberOfLines={3}
          allowClear
          placeholder='Description' 
          value={eventData.description} 
          onChange={(val) => handleChangeValue('description',val)}
        />
        <SpaceComponent height={15}/>
        <ChoiceLocation/>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent text='Add New' onPress={handleAddNew} type='primary'/>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen