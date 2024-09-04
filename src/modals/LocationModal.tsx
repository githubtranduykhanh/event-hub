import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import  InputComponent from '~/components/InputComponent';
import  RowComponent from '~/components/RowComponent';
import { colors } from '~/styles';
import { CloseCircle, SearchNormal1 } from 'iconsax-react-native';
import SpaceComponent from '~/components/SpaceComponent';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { LocationModel } from '~/models/LocationModel';


interface Props {
    visible:boolean;
    onClose:Dispatch<SetStateAction<boolean>>;
    onSelect:(val:string) => void;
}


const LocationModal:React.FC<Props> = ({visible,onClose,onSelect}) => {
    const [search,setSearch] = useState<string>('')

    const handleSearchLocation  = async () => {
        const urlApi = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${search}&limit=10&apiKey=${process.env.EXPO_PUBLIC_APP_API_KEY_HERE}`
        console.log(urlApi)
        try {
            const req = await axios.get(urlApi)

            const items:LocationModel = req.data
            items.items.forEach(item=>{
                console.log(item.title)
            })
            


        } catch (error) {
            console.error('Error with Search Location:', error);
        }

    }
    console.log(process.env.EXPO_PUBLIC_APP_API_KEY)
  return (
    <Modal
      transparent
      visible={visible}
      animationType='slide'
    >
        <View style={{flex:1,backgroundColor:colors.white,paddingVertical:42,paddingHorizontal:20}}>
            <RowComponent justify='flex-end'>
                <TouchableOpacity onPress={() => onClose(false)}>
                    <CloseCircle
                        size="32"
                        color={colors.text}
                    />
                </TouchableOpacity>
            </RowComponent>
            <SpaceComponent height={15}/>
            <RowComponent>
                <GooglePlacesAutocomplete
                
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyAF2Re9YjNd9I9RR8U0Nar25NUKiu_4hEs',
                        language: 'en',
                    }}
                    
                />
                {/* <InputComponent styles={{flex:1}} allowClear  affix={<SearchNormal1 size="22" color={colors.text}/>} placeholder='Search...' value={search} onChange={(val) => setSearch(val)}/> */}
                <SpaceComponent width={10}/>
                <TouchableOpacity 
                onPress={handleSearchLocation}
                style={{
                    width:58,
                    height:58,
                    borderRadius:12,
                    backgroundColor:colors.primary,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <SearchNormal1 size="22" color={colors.white}/>
                </TouchableOpacity>
            </RowComponent>
        </View>
    </Modal> 
  )
}

export default memo(LocationModal)