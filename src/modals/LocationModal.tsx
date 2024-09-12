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
import MapView, { LatLng, MapPressEvent, Marker, MarkerPressEvent, Polyline, PROVIDER_GOOGLE, } from 'react-native-maps';
import TextComponent from '~/components/TextComponent';
import ButtonComponent from '~/components/ButtonComponent';
import { Position } from '~/models';
import { decode, fetchSearchGeocode, getAddressFromCoordinates, getRoute, SearchResultHereApi } from '~/apis/hereapi';

// Định nghĩa kiểu dữ liệu cho các điểm tọa độ


// Tọa độ hai điểm
const pointA = { latitude: 10.0452, longitude: 105.7460 };

const pointB = { latitude: 10.8231, longitude: 106.6297 };



export interface DataPositionModal {
    address: string;
    lat: number;
    lng: number;
}

interface Props {
    visible: boolean;
    dataPositionModal: DataPositionModal;
    onClose: Dispatch<SetStateAction<boolean>>;
    onSubMit: (val: string, position: Position) => void;
}


const LocationModal: React.FC<Props> = ({ visible, onClose, onSubMit, dataPositionModal }) => {
    const [routeCoordinates, setRouteCoordinates] = useState<LatLng[] | null>(null);
    const [search, setSearch] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [displayListSearch, setDisplayListSearch] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState<SearchResultHereApi[]>([]);
    const [results, setResults] = useState<SearchResultHereApi[]>([]);
    const [markerSelected, setMarkerSelected] = useState<SearchResultHereApi | null>(null)
    const debouncedQuery = useDebounce(search, 500);
    const mapRef = useRef<MapView>(null);
    const [region, setRegion] = useState({
        latitude: dataPositionModal.lat,
        longitude: dataPositionModal.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });


    useEffect(() => {
        if (debouncedQuery && debouncedQuery !== '') {
            fetchSearchGeocode(
                debouncedQuery,
                (data) => {
                    setSearchResults(data)
                    setDisplayListSearch(true)
                },
                (error) => {
                    console.error('Error Fetch Search Geocode occurred:', error.message)
                }
            )
        } else {
            setSearchResults([]) // Xóa kết quả khi không có query
            setDisplayListSearch(false)
        }
    }, [debouncedQuery]);


    useEffect(() => {
        const fetchRoute = async () => {
            const polyline = await getRoute(pointA.latitude, pointA.longitude, pointB.latitude,pointB.longitude); // Điểm bắt đầu và kết thúc
            if (polyline) {
               
                // Chuyển đổi polyline từ dạng Base64 thành array của coordinates
                const coordinates = decode(polyline);
                const latLngCoordinates: LatLng[] = coordinates.polyline.map(coord => {
                    return {
                        latitude: coord[0],
                        longitude: coord[1],
                    };
                });
                setRouteCoordinates(latLngCoordinates);
            }
        };

        fetchRoute();
    }, []);

    
    const handleSearchLocation = () => {
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

        fetchSearchGeocode(
            search,
            (data) => {
                setResults(data)
                setDisplayListSearch(false)
            },
            (error) => {
                console.error('Error Fetch Search Geocode occurred:', error.message)
            }
        );
    }





    const handeleFocusMap = (searchResults: SearchResultHereApi) => {
        setMarkerSelected(searchResults)
        const centerContent = {
            latitude: searchResults.position.lat,
            longitude: searchResults.position.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }
        mapRef?.current?.animateCamera({ center: centerContent, zoom: 10 }, { duration: 1500 })
        setResults([searchResults])
        setDisplayListSearch(false)
    }


    const handleOnSubMit = () => {
        if (!markerSelected) {
            results && results.length === 1 ? onSubMit(`${results[0].title}`, { lat: results[0].position.lat, lng: results[0].position.lng }) : onSubMit(`${dataPositionModal.address}`, { lat: dataPositionModal.lat, lng: dataPositionModal.lng })
        }
        else {
            console.log(markerSelected)
            onSubMit(`${markerSelected.title}`, { lat: markerSelected.position.lat, lng: markerSelected.position.lng })
        }
        onClose(false)
    }

    const handleMapPress = async (event: MapPressEvent) => {
        const { coordinate } = event.nativeEvent;
        getAddressFromCoordinates(
            {
                lat:coordinate.latitude,
                lng:coordinate.longitude
            },
            (data) => {
                console.log(data)
                setResults(data)
                setMarkerSelected(data[0])
            },
            (error) => {
                console.error('Error Get Address From Coordinates:', error.message)
            }
        )   
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
                <RowComponent styles={{ position: 'relative' }}>
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
                        <View style={[globalStyles.shadow, {
                            position: 'absolute',
                            top: 62,
                            right: 70,
                            left: 0,
                            backgroundColor: colors.white,
                            zIndex: 1,
                            maxHeight: 200,
                            borderRadius: 12,
                        }]}>

                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={searchResults}
                                renderItem={({ item, index }) => <TouchableOpacity onPress={() => handeleFocusMap(item)} style={{ paddingHorizontal: 12, paddingVertical: 10 }} key={`results-searh-${item.id}`}>
                                    <TextComponent text={item.title} />
                                </TouchableOpacity>}
                            />
                        </View>}
                </RowComponent>

                <MapView
                    ref={mapRef}
                    style={{ flex: 1, marginTop: 10, borderRadius: 12, zIndex: -1 }}
                    region={region}
                    showsUserLocation
                    showsMyLocationButton
                    onRegionChangeComplete={(region) => setRegion(region)}
                    onPress={handleMapPress}
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

                    <Marker coordinate={pointA} title="Point A" />
                    <Marker coordinate={pointB} title="Point B" />
                    {routeCoordinates && (
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeColor={colors.primary} // Màu đường
                            strokeWidth={3}   // Độ dày của đường
                            lineDashPattern={[1, 5]}
                        />
                    )}
                </MapView>
                <SpaceComponent height={20} />
                <ButtonComponent text='Submit' type='primary' onPress={handleOnSubMit} />
            </View>
        </Modal>
    )
}

export default memo(LocationModal)