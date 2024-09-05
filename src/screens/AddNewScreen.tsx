import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { EventConstanst, initEvent } from '~/constants/events'
import { ButtonComponent, ChoiceLocation, ContainerComponent, DateTimePickerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~/components'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { apiUsers } from '~/apis/user'


const AddNewScreen = () => {
  const {_id} = useSelector((state:RootState) => state.auth.user)
  const {city,country,isoCountryCode} = useSelector((state:RootState) => state.app.region)
  const [eventData, setEventData] = useState<EventConstanst>({...initEvent,authorId:_id,location:city && isoCountryCode && country ? {address:`${city}, ${isoCountryCode}`,title:country} : {address:'ChoiceLocation',title:'ChoiceLocation'}})


  const handleChangeValue = (key:string, value:string) => {
    setEventData(prve => ({...prve,[key]:value}))
  }

  const handleAddNew = () => {
    console.log(eventData)
    apiUsers().then((res)=>res.data).then(data=>{
      console.log(JSON.stringify(data, null, 2));
    }).catch(error => console.log('Api Users error',error))
  }


  const handleOnSelectDateTime = (date:Date,key:string) => {
    setEventData(prve => ({...prve,[key]:date}))
  }

  const handleOnSubMitLocation = (val:string,title: string) => {
    setEventData(prve => ({...prve,location:{...prve.location,address:val,title}}))
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
        <RowComponent>
          <DateTimePickerComponent label='StartTime' testID='startAt' mode='time' dateSelected={eventData.startAt} onSelect={handleOnSelectDateTime}/>
          <SpaceComponent width={15}/>
          <DateTimePickerComponent label='EndTime' testID='endAt' mode='time' dateSelected={eventData.endAt} onSelect={handleOnSelectDateTime}/>
        </RowComponent>
        <SpaceComponent height={15}/>
        <DateTimePickerComponent label='Date' testID='date' mode='date' dateSelected={eventData.date} onSelect={handleOnSelectDateTime}/>
        <SpaceComponent height={15}/>
        <ChoiceLocation onSubMitLocation={handleOnSubMitLocation} dataLocation={eventData.location.address}/>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent text='Add New' onPress={handleAddNew} type='primary'/>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen