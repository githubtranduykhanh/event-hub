import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Dispatch, memo, SetStateAction, useEffect, useRef, useState } from 'react'
import InputComponent from '~/components/InputComponent';
import RowComponent from '~/components/RowComponent';
import { colors, globalStyles } from '~/styles';
import { CloseCircle, SearchNormal1 } from 'iconsax-react-native';
import SpaceComponent from '~/components/SpaceComponent';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { LocationModel } from '~/models/LocationModel';
import { useDebounce } from '~/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import MapView, { Marker, MarkerPressEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import TextComponent  from '~/components/TextComponent';
import  ButtonComponent  from '~/components/ButtonComponent';

export interface SearchResult {
    id: string;
    title: string;
    position: {
        lat: number;
        lng: number;
    };
    address: {
        label: string;
        countryCode:string;
        countryName:string;
        county:string;
        city:string;
    };
}
interface Props {
    visible: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
    onSubMit: (val: string) => void;
}


const LocationModal: React.FC<Props> = ({ visible, onClose,onSubMit }) => {
    const {latitude,longitude,city,isoCountryCode} = useSelector((state:RootState) => state.app.region)
    const [search, setSearch] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [displayListSearch, setDisplayListSearch] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [markerSelected,setMarkerSelected] = useState<SearchResult | null>(null)
    const debouncedQuery = useDebounce(search, 500);
    const mapRef = useRef<MapView>(null);
    const [region, setRegion] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    
    useEffect(() => {
        if (debouncedQuery && debouncedQuery !== '') {
            fetchSearchGeocode(debouncedQuery,'search');
        }else{
            setResults([])
            setSearchResults([])
        }
    }, [debouncedQuery]);

    const handleSearchLocation = async () => {
       /*  const urlApi = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${search}&limit=10&apiKey=${process.env.EXPO_PUBLIC_APP_API_KEY_HERE}`
        console.log(urlApi)
        try {
            const req = await axios.get(urlApi)

            const items: LocationModel = req.data
            items.items.forEach(item => {
                console.log(item.title)
            })



        } catch (error) {
            console.error('Error with Search Location:', error);
        } */
        fetchSearchGeocode(search,'submit')
        
    }
    const fetchSearchGeocode = async (searchQuery: string, type:'search'|'submit') => {
        try {
            const response = await axios.get('https://geocode.search.hereapi.com/v1/geocode', {
                params: {
                    q: searchQuery,
                    apiKey: process.env.EXPO_PUBLIC_APP_API_KEY_HERE,
                },
            });

            const items: SearchResult[] = response.data.items.map((item: any) => ({
                id: item.id,
                title: item.title,
                position: item.position,
                address: item.address,
            }));
            console.log(items)
            if(type === 'search') {
                setSearchResults(items)
                setDisplayListSearch(true)
            }
            else {
                setResults(items) 
                setDisplayListSearch(false)
            }          
                
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handeleFocusMap = (searchResults:SearchResult) => {
        setMarkerSelected(searchResults)
        const centerContent = {
            latitude:searchResults.position.lat,
            longitude:searchResults.position.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }
        mapRef?.current?.animateCamera({center:centerContent,zoom:10},{duration:3000})
        setResults([searchResults])
        setDisplayListSearch(false)
    }


    const handleOnSubMit = () => {
        if(!markerSelected) {
            results && results.length === 1 ? onSubMit(`${results[0].address.city}, ${results[0].address.countryCode}`)  : onSubMit(`${city}, ${isoCountryCode}`)
        }
        else{
            console.log(markerSelected)
            onSubMit(`${markerSelected.address.city}, ${markerSelected.address.countryCode}`)
        }
        onClose(false)
    }

    return (
        <Modal
            transparent
            visible={visible}
            animationType='slide'
        >
            <View style={{ flex: 1, backgroundColor: colors.white, paddingVertical: 42, paddingHorizontal: 20 }}>
                <RowComponent justify='flex-end'>
                    <TouchableOpacity onPress={() => onClose(false)}>
                        <CloseCircle
                            size="32"
                            color={colors.text}
                        />
                    </TouchableOpacity>
                </RowComponent>
                <SpaceComponent height={15} />
                <RowComponent styles={{position:'relative'}}>
                    {/* <GooglePlacesAutocomplete
                
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: process.env.EXPO_PUBLIC_APP_API_KEY,
                        language: 'en',
                    }}
                    
                /> */}
                    <InputComponent styles={{ flex: 1 }} allowClear affix={<SearchNormal1 size="22" color={colors.text} />} placeholder='Search...' value={search} onChange={(val) => setSearch(val)} />
                    <SpaceComponent width={10} />
                    <TouchableOpacity
                        onPress={handleSearchLocation}
                        style={{
                            width: 58,
                            height: 58,
                            borderRadius: 12,
                            backgroundColor: colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <SearchNormal1 size="22" color={colors.white} />
                    </TouchableOpacity>
                    {displayListSearch && searchResults && searchResults.length > 0 && 
                        <View style={[globalStyles.shadow,{
                            position:'absolute',
                            top:62,
                            right:70,
                            left:0,
                            backgroundColor:colors.white,
                            zIndex:1,
                            maxHeight:200,
                            borderRadius:12,
                        }]}>

                        <FlatList               
                            showsHorizontalScrollIndicator={false} 
                            data={searchResults}
                            renderItem={({item,index}) => <TouchableOpacity onPress={() => handeleFocusMap(item)} style={{paddingHorizontal:12,paddingVertical:10}} key={`results-searh-${item.id}`}>
                                 <TextComponent text={item.title}/>
                            </TouchableOpacity>}
                        />
                    </View>}
                </RowComponent>
                
                <MapView    
                    ref={mapRef}     
                    style={{flex:1,marginTop:10,borderRadius:12,zIndex:-1}}
                    region={region}
                    showsUserLocation
                    showsMyLocationButton
                    onRegionChangeComplete={(region) => setRegion(region)}
                >
                    {results && results.map((result) => (
                        <Marker
                            key={result.id}
                            coordinate={{
                                latitude: result.position.lat,
                                longitude: result.position.lng,
                            }}
                            title={result.title}
                            description={result.address.label}
                            onPress={() => setMarkerSelected(result)}
                        />
                    ))}
                </MapView>
                <SpaceComponent height={20}/>
                <ButtonComponent text='Submit' type='primary'  onPress={handleOnSubMit}/>
            </View>
        </Modal>
    )
}

export default memo(LocationModal)