import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { initEvent } from '~/constants/events'
import { ButtonComponent, ChoiceLocation, ContainerComponent, DateTimePickerComponent, DropdownPicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent, UploadImagePicker } from '~/components'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { apiAddNewEvent, apiUsers } from '~/apis/user'
import { EventModel, SelectModel } from '~/models'
import { Validate, ValidateEventKeyAndErrMess } from '~/utils/validate'
import { colors } from '~/styles'
import { randomUUID } from 'expo-crypto'
import { FileHelper } from '~/utils/file'
import { LoadingModal } from '~/modals'


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
    key:'caterory',
    errMess:'Caterory is required'
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

const AddNewScreen = () => {
  const {_id} = useSelector((state:RootState) => state.auth.user)
  const {city,country,isoCountryCode} = useSelector((state:RootState) => state.app.region)
  const [eventData, setEventData] = useState<EventModel>({...initEvent,authorId:_id,location:city && isoCountryCode ? {...initEvent.location,address:`${city}, ${isoCountryCode}`} : {...initEvent.location,address:'ChoiceLocation'}})
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

  const handleAddNew = async () => {
    console.log(eventData)
    try {
      if(fileSelected) {
        const urlImage = await FileHelper.uploadImageToFirebase(fileSelected, (progress) => setUploadProgress(progress))
        if(!urlImage) {
          Alert.alert('Upload image failed !')
          return
        } 
        eventData.imageUrl = urlImage
      }
      console.log(eventData)
      const res = await apiAddNewEvent(eventData)
      const data = res.data
      console.log(data)
    } catch (error:any) {
       console.log('Handle Add New Error:', error.response.data)
    }
  }

  const handleGetAllUsers = () => {
    apiUsers().then((res)=>res.data).then(data=>{
      // console.log(JSON.stringify(data, null, 2));
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

  const handleOnSelectDropdownPickerUser = (val:string[]) => {
    setEventData(prve => ({...prve,users:val}))
  }


  const handleOnSelectDropdownPickerCaterory = (val:string[]) => {
    setEventData(prve => ({...prve,caterory:val}))
  }

  const handleOnSelectUploadImagePicker = (type:string,imageString:string) => {
      setFileSelected(type === 'file' ? imageString : null)
      handleChangeValue('imageUrl',imageString)
  }
  
  return (
    <>
    <ContainerComponent isScroll>
      <StatusBar style='dark' />
      
      <SectionComponent>
        <TextComponent title text='Add New'/>
      </SectionComponent>
      <SectionComponent>
       
        <UploadImagePicker onSelect={handleOnSelectUploadImagePicker}/>
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
          selected={eventData.caterory}
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
        <ChoiceLocation onSubMitLocation={(val) => handleChangeValue('location.address',val)} dataLocation={eventData.location.address}/>
      </SectionComponent>
      {errorsMess && errorsMess.length > 0 && <SectionComponent>
            {errorsMess.map(item => (<TextComponent key={`errorsMess-${randomUUID()}`} text={item.errMess} color={colors.danger}/>))}
          </SectionComponent>}
      <SectionComponent>
        <ButtonComponent disable={errorsMess.length > 0} text='Add New' onPress={handleAddNew} type='primary'/>
      </SectionComponent>
    </ContainerComponent>
    <LoadingModal visible={uploadProgress > 0 && uploadProgress < 100}/>
    </>
  )
}

export default AddNewScreen