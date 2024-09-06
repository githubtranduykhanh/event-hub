import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EventConstanst, initEvent } from '~/constants/events'
import { ButtonComponent, ChoiceLocation, ContainerComponent, DateTimePickerComponent, DropdownPicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent, UploadImagePicker } from '~/components'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { apiUsers } from '~/apis/user'
import { SelectModel } from '~/models'


const AddNewScreen = () => {
  const {_id} = useSelector((state:RootState) => state.auth.user)
  const {city,country,isoCountryCode} = useSelector((state:RootState) => state.app.region)
  const [eventData, setEventData] = useState<EventConstanst>({...initEvent,authorId:_id,location:city && isoCountryCode ? {...initEvent.location,address:`${city}, ${isoCountryCode}`} : {...initEvent.location,address:'ChoiceLocation'}})
  const [selectUsers,setSelectUsers] = useState<SelectModel[]>([])


  useEffect(()=>{
    handleGetAllUsers()
  },[])

  const handleChangeValue = (key: string, value: string) => {
    setEventData(prev => {
      const prevData = prev as any; // Ép kiểu sang 'any' để tránh lỗi
      const keys = key.split('.');
  
      if (keys.length > 1) {
        const [parentKey, childKey] = keys;
        return {
          ...prevData,
          [parentKey]: {
            ...prevData[parentKey],
            [childKey]: value
          }
        };
      } else {
        return { ...prevData, [key]: value };
      }
    });
  }

  const handleAddNew = () => {
    console.log(eventData)
  }

  const handleGetAllUsers = () => {
    apiUsers().then((res)=>res.data).then(data=>{
      console.log(JSON.stringify(data, null, 2));
      if(data && data?.data && data?.data?.length > 0){
        setSelectUsers(data.data.map((item):SelectModel=>({lable:item.email,value:item._id})))
      }
    }).catch(error => console.log('Api Users error',error))
  }

  const handleOnSelectDateTime = (date:Date,key:string) => {
    setEventData(prve => ({...prve,[key]:date}))
  }

  const handleOnSubMitLocation = (val:string) => {
    setEventData(prve => ({...prve,location:{...prve.location,address:val}}))
  }

  const handleOnSelectDropdownPicker = (val:string[]) => {
    setEventData(prve => ({...prve,users:val}))
  }
  
  return (
    <ContainerComponent isScroll>
      <StatusBar style='dark' />
      
      <SectionComponent>
        <TextComponent title text='Add New'/>
      </SectionComponent>
      <SectionComponent>
        <UploadImagePicker/>
        <SpaceComponent height={15}/>
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
          <DateTimePickerComponent label='Start At' testID='startAt' mode='time' dateSelected={eventData.startAt} onSelect={handleOnSelectDateTime}/>
          <SpaceComponent width={15}/>
          <DateTimePickerComponent label='End At' testID='endAt' mode='time' dateSelected={eventData.endAt} onSelect={handleOnSelectDateTime}/>
        </RowComponent>
        <SpaceComponent height={15}/>
        <DateTimePickerComponent label='Date' testID='date' mode='date' dateSelected={eventData.date} onSelect={handleOnSelectDateTime}/>
        <SpaceComponent height={15}/>
        <DropdownPicker 
          lable='Invited users'
          values={selectUsers}
          selected={eventData.users}
          multible
          onSelect={handleOnSelectDropdownPicker}
        />
        <SpaceComponent height={15}/>
        <InputComponent  allowClear placeholder='Title Address' value={eventData.location.title} onChange={(val) => handleChangeValue('location.title',val)}/>
        <SpaceComponent height={15}/>
        <InputComponent  allowClear type='number-pad' placeholder='Price' value={eventData.price} onChange={(val) => handleChangeValue('price',val)}/>
        <SpaceComponent height={15}/>
        <ChoiceLocation onSubMitLocation={(val) => handleChangeValue('location.address',val)} dataLocation={eventData.location.address}/>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent text='Add New' onPress={handleAddNew} type='primary'/>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen