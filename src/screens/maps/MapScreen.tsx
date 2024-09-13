import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { appInfo, colors, globalStyles, typography } from "~/styles";
import { CardComponent, CategoriesList, EventItem, InputComponent, MarkerCustom, RowComponent, SpaceComponent, TextComponent } from "~/components";
import { ArrowCircleLeft2, ArrowLeft, ArrowLeft2, SearchNormal1 } from "iconsax-react-native";
import { decode, fetchSearchGeocode, getRoute, SearchResultHereApi } from "~/apis/hereapi";
import { useDebounce } from "~/hooks";
import {MaterialIcons} from '@expo/vector-icons';
import { apiByDistance } from "~/apis";
import { ApiHelper } from "~/apis/helper";
import { EventModel } from "~/models";
import { randomUUID } from "expo-crypto";
import { Categories } from "~/constants/categories";

interface RouteCoordinates {
  event:EventModel;
  coordinates:LatLng[];
}



const MapScreen = ({navigation}:any) => {
  const { city, latitude, longitude, isoCountryCode } = useSelector(
    (state: RootState) => state.app.region
  );
  const mapRef = useRef<MapView>(null);
  const [search, setSearch] = useState<string>("");
  const debouncedQuery = useDebounce(search, 500);
  const [searchResults, setSearchResults] = useState<SearchResultHereApi[]>([]);
  const [displayListSearch, setDisplayListSearch] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResultHereApi[]>([]);
  const [markerSelected, setMarkerSelected] = useState<SearchResultHereApi | null>(null);
  const [eventDistance,setEventDistance] = useState<EventModel[]>([])   
  const [routeCoordinates, setRouteCoordinates] = useState<RouteCoordinates | null>(null);
  const [region, setRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(()=>{
    apiByDistance({lat:latitude,lng:longitude,distance:5})
    .then((res)=> res.data)
    .then(data => {
      if(data && data.data && data.data?.length > 0) setEventDistance(data.data)
    })
    .catch(error=>{
      const {from,err} = ApiHelper.getMesErrorFromServer(error)
      console.log('FROM',from)
      console.log('ERR',err)
    })
  },[])

  useEffect(() => {
    if (debouncedQuery && debouncedQuery !== "") {
      fetchSearchGeocode(
        debouncedQuery,
        (data) => {
          setSearchResults(data);
          setDisplayListSearch(true);
        },
        (error) => {
          console.error("Error Fetch Search Geocode occurred:", error.message);
        }
      );
    } else {
      setSearchResults([]); // Xóa kết quả khi không có query
      setDisplayListSearch(false);
    }
  }, [debouncedQuery]);

  const handeleFocusMap = (searchResults: SearchResultHereApi) => {
    setMarkerSelected(searchResults);
    const centerContent = {
      latitude: searchResults.position.lat,
      longitude: searchResults.position.lng,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    mapRef?.current?.animateCamera(
      { center: centerContent, zoom: 10 },
      { duration: 1500 }
    );
    setResults([searchResults]);
    setDisplayListSearch(false);
  };


  const handleMoveToUserLocation = () => {
    mapRef?.current?.animateToRegion(region,1500)
  }

  const handleOnPressMarker = async (event:EventModel) => {
    if(event._id === routeCoordinates?.event._id) setRouteCoordinates(null)
    else{
      const polyline = await getRoute(latitude, longitude, event.position.lat,event.position.lng); // Điểm bắt đầu và kết thúc
      if (polyline) {
          // Chuyển đổi polyline từ dạng Base64 thành array của coordinates
          const coordinates = decode(polyline);
          const latLngCoordinates: LatLng[] = coordinates.polyline.map(coord => {
              return {
                  latitude: coord[0],
                  longitude: coord[1],
              };
          });
          setRouteCoordinates({event,coordinates:latLngCoordinates})
      }
    }
  }


  return (
    <View style={{ flex: 1}}>
      <StatusBar style="dark" />
      <SafeAreaView
        style={{ position: "absolute", top: 0, right: 0, left: 0, zIndex: 2,}}
      >
        <RowComponent styles={{paddingHorizontal:20}}>
          <InputComponent
            styles={{ flex: 1 }}
            allowClear
            affix={<TouchableOpacity onPress={()=>navigation.goBack()}>
              <ArrowLeft2 color={colors.text} size={typography.fontSizeLarge}/>
            </TouchableOpacity>}
            placeholder="Search..."
            value={search}
            onChange={(val) => setSearch(val)}
          />
          {displayListSearch && searchResults && searchResults.length > 0 && (
            <View
              style={[
                globalStyles.shadow,
                {
                  position: "absolute",
                  top: 62,
                  right: 20,
                  left: 20,
                  backgroundColor: colors.white,
                  zIndex: 1,
                  maxHeight: 200,
                  borderRadius: 12,
                },
              ]}
            >
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={searchResults}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => handeleFocusMap(item)}
                    style={{ paddingHorizontal: 12, paddingVertical: 10 }}
                    key={`results-searh-${item.id}`}
                  >
                    <TextComponent text={item.title} />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <CardComponent
            onPress={handleMoveToUserLocation}
            styles={{padding:15,marginRight:0}}>
            <MaterialIcons name="my-location" size={typography.fontSizeExtraLarge} color={colors.primary} />
          </CardComponent>
        </RowComponent>
        <SpaceComponent height={15}/>
            <CategoriesList  styles={
              {
                position:'absolute',
                bottom:-30,
                left:20,
                zIndex:-1
              }
            }/>

        
      </SafeAreaView>
      {routeCoordinates && routeCoordinates.event && (
          <View style={{position:'absolute',bottom:30,right:20,left:20}}>
              <EventItem item={routeCoordinates.event} type='list'/>
          </View> 
      )}
      <MapView
        ref={mapRef}
        style={{ flex: 1, zIndex: -1 }}
        region={region}
        showsUserLocation
        showsMyLocationButton
        mapType='standard'
      >
        {eventDistance && eventDistance.length > 0 && eventDistance.map((event) =>  {
              const categoryItem = Categories(true).find(item => item.key === event.categories[0])

              return (
                <Marker 
                  key={randomUUID()}
                  coordinate={{
                    latitude: event.position.lat,
                    longitude: event.position.lng,
                  }}
                  title={event.title}
                  description={event.description}
                  onPress={() => handleOnPressMarker(event)}
                >
                  <MarkerCustom>
                    <View style={{
                      backgroundColor: categoryItem?.iconColor,
                      width: 30,
                      height: 30,
                      marginTop: -4,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      {categoryItem?.icon}
                    </View>
                  </MarkerCustom>
                </Marker>
              );
          })}

          {routeCoordinates && routeCoordinates.coordinates.length > 0 && (
            <Polyline
             coordinates={routeCoordinates.coordinates}
             strokeColor={colors.primary} // Màu đường
             strokeWidth={3}   // Độ dày của đường
             lineDashPattern={[1, 5]}
            />           
          )}
      </MapView>
    </View>
  );
};

export default MapScreen;
