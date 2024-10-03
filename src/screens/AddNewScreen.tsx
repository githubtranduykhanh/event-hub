import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { initEvent } from '~/constants/events'
import { ButtonComponent, ChoiceLocation, ContainerComponent, DateTimePickerComponent, DropdownPicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent, UploadImagePicker } from '~/components'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'

import { EventModel, Position, SelectModel } from '~/models'
import { Validate, ValidateEventKeyAndErrMess } from '~/utils/validate'
import { colors } from '~/styles'
import { randomUUID } from 'expo-crypto'
import { FileHelper } from '~/utils/file'
import { LoadingModal } from '~/modals'
import { apiAddNewEvent, apiUsers } from '~/apis'



const keyAndErrMess:ValidateEventKeyAndErrMess[] = [
  {
    key:'imageUrl',
    errMess:'Image is required'
  },
  {
    key:'title',
    errMess:'Title  is required'
  },
  {
    key:'categories',
    errMess:'Categories is required'
  },
  {
    key:'location.title',
    errMess:'Title address is required'
  },
  {
    key:'price',
    errMess:'Price is required'
  },
]  

const AddNewScreen = ({navigation}:any) => {
  const {_id} = useSelector((state:RootState) => state.auth.user)
  const {city,latitude,longitude,isoCountryCode} = useSelector((state:RootState) => state.app.region)
  const [eventData, setEventData] = useState<EventModel>({
    ...initEvent,
    authorId:_id,
    location:city && isoCountryCode 
    ? {...initEvent.location,address:`${city}, ${isoCountryCode}`} 
    : {...initEvent.location,address:'ChoiceLocation'},
    position:latitude && longitude
    ? {...initEvent.position,lat:latitude,lng:longitude}
    : {...initEvent.position}
  })
  const [selectUsers,setSelectUsers] = useState<SelectModel[]>([])
  const [fileSelected,setFileSelected] = useState<string|null>(null)
  const [errorsMess,setErrorMess] =  useState<ValidateEventKeyAndErrMess[]>([])
  const [uploadProgress, setUploadProgress] = useState<number>(0);  // Track progress
  
  useEffect(()=>{
    handleGetAllUsers()
  },[])


  useEffect(()=>{
     setErrorMess(Validate.EventValidation(eventData,keyAndErrMess))
  },[eventData])


  const resetStates = () => {
    setEventData({
      ...initEvent,
      authorId: _id,
      location: city && isoCountryCode
        ? { ...initEvent.location, address: `${city}, ${isoCountryCode}` }
        : { ...initEvent.location, address: 'ChoiceLocation' },
      position: latitude && longitude
        ? { ...initEvent.position, lat: latitude, lng: longitude }
        : { ...initEvent.position }
    });
    setFileSelected(null);
    setUploadProgress(0);
  };
  

  const handleChangeValue = (key: string, value: string | Position) => {
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

  const handleAddNew = async () => {
    try {

      if(!Validate.ValidateDates(eventData.startAt,eventData.endAt)){
        Alert.alert('EndAt must be greater than StartAt !')
        return
      }
      if(fileSelected) {
        const urlImage = await FileHelper.uploadImageToFirebase(fileSelected, (progress) => setUploadProgress(progress))
        if(!urlImage) {
          Alert.alert('Upload image failed !')
          return
        } 
        eventData.imageUrl = urlImage
      }
      const res = await apiAddNewEvent(eventData)
      const data = res.data
      if(data.status) resetStates()
      else Alert.alert('Error',data.mes)
    } catch (error:any) {
       console.log('Handle Add New Error:', error.response.data)
    }
  }

  const handleGetAllUsers = () => {
    apiUsers().then((res)=>res.data).then(data=>{
      // console.log(JSON.stringify(data, null, 2));
      if(data && data?.data && data?.data?.length > 0){
        setSelectUsers(data.data.filter((item):boolean=> item._id != eventData.authorId).map((item):SelectModel => ({lable:item.email,value:item._id})))
      }
    }).catch(error => console.log('Api Users error',error))
  }

  const handleOnSelectDateTime = (date:Date,key:string) => {
    setEventData(prve => ({...prve,[key]:date}))
  }


  const handleOnSelectDropdownPickerUser = (val:string[]) => {
    setEventData(prve => ({...prve,users:val}))
  }


  const handleOnSelectDropdownPickerCaterory = (val:string[]) => {
    setEventData(prve => ({...prve,categories:val}))
  }

  const handleOnSelectUploadImagePicker = (type:string,imageString:string) => {
      setFileSelected(type === 'file' ? imageString : null)
      handleChangeValue('imageUrl',imageString)
  }


  const handleOnSubMitLocation = (location: string, position: Position) =>{
    handleChangeValue('location.address',location)
    handleChangeValue('position',position)
  }
  
  return (
    <>
    <ContainerComponent isScroll  statusBarStyle='dark-content'>
      <SectionComponent>
        <TextComponent title text='Add New'/>
      </SectionComponent>
      <SectionComponent>
        <UploadImagePicker image={eventData.imageUrl} onSelect={handleOnSelectUploadImagePicker}/>
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
        <DropdownPicker 
          placeholder='Category'
          values={[
            {
              lable:'Sport',
              value:'sport'
            },
            {
              lable:'Food',
              value:'food'
            },
            {
              lable:'Art',
              value:'art'
            },
            {
              lable:'Music',
              value:'music'
            },
          ]}
          selected={eventData.categories}
          onSelect={handleOnSelectDropdownPickerCaterory}
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
          placeholder='Users'
          lable='Invited users'
          values={selectUsers}
          selected={eventData.users}
          multible
          onSelect={handleOnSelectDropdownPickerUser}
        />
        <SpaceComponent height={15}/>
        <InputComponent  allowClear placeholder='Title Address' value={eventData.location.title} onChange={(val) => handleChangeValue('location.title',val)}/>
        <SpaceComponent height={15}/>
        <InputComponent  allowClear type='number-pad' placeholder='Price' value={eventData.price} onChange={(val) => handleChangeValue('price',val)}/>
        <SpaceComponent height={15}/>
        <ChoiceLocation  onSubMitLocation={handleOnSubMitLocation} dataPosition={{
            address:eventData.location.address,
            lat:eventData.position.lat,
            lng:eventData.position.lng
        }} dataLocation={eventData.location.address}/>
      </SectionComponent>
      {errorsMess && errorsMess.length > 0 && <SectionComponent>
            {errorsMess.map(item => (<TextComponent key={`errorsMess-${randomUUID()}`} text={item.errMess} color={colors.danger}/>))}
          </SectionComponent>}
      <SectionComponent>
        <ButtonComponent disable={errorsMess.length > 0} text='Add New' onPress={handleAddNew} type='primary'/>
      </SectionComponent>
      <SpaceComponent height={20}/>
    </ContainerComponent>
    <LoadingModal visible={uploadProgress > 0 && uploadProgress < 100}/>
    </>
  )
}

export default AddNewScreen