import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ContainerComponent, EventItem, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~/components'
import { useFocusEffect } from '@react-navigation/native'
import { Feather } from "@expo/vector-icons";
import { SearchNormal1 } from 'iconsax-react-native';
import { apiGetEvents } from '~/apis';
import { useSelector } from 'react-redux';
import { appSelector } from '~/redux/store';
import { ApiHelper } from '~/apis/helper';
import { EventModel } from '~/models';
import { randomUUID } from 'expo-crypto';

const EventSeeAll = ({navigation,route}:any) => {
  const {filter}:{filter:string} = route.params
  const { region } = useSelector(appSelector)
  const [events,setEvents] = useState<EventModel[]>([])
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false); // Tải thêm dữ liệu
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // Làm mới dữ liệu
  useFocusEffect(
    useCallback(() => {
      // Logic hoặc hiệu ứng muốn thực hiện khi màn hình được focus
      console.log('Screen is focused');
      if(filter === 'Upcoming Events'){
        setIsLoading(true);
        loadMoreEvents(1,filter)
        setIsLoading(false);
      }else {
        setIsLoading(true);
        loadMoreEvents(1,filter)
        setIsLoading(false);
      }
      
      // Trả về một hàm để clean-up khi màn hình bị unfocused (tương tự như trong useEffect)
      return () => {
        console.log('Screen is unfocused');
        setPage(1);
        setTotalCount(0);
        setEvents([]);
        setIsLoading(false);
        setIsLoadingMore(false);
      };
    }, [filter,region])
  );


  useEffect(() => {
    if(page > 1) loadMoreEvents(page,filter); // Tải thêm dữ liệu khi page tăng
  }, [page,filter,region]);

  const loadMoreEvents = (page: number,filter:string) => {
    setIsLoadingMore(true);
    if(filter === 'Upcoming Events'){
      apiGetEvents({
        author: true,
        limit: 2,
        'date[gte]': new Date().toISOString(),
        page
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.status && data.data && data.counts) {
          console.log('loadMoreEvents',{
            length:data.data.length,
            page,
            filter
          })
          setEvents((prevEvents) =>
            page !== 1
              ? [...(prevEvents ?? []), ...(data.data ?? [])]
              : data.data ?? []
          ); // Nối thêm dữ liệu mới
          setTotalCount(data.counts);
        }
      })
      .catch(err => console.log(ApiHelper.getMesErrorFromServer(err)))
      .finally(() => setIsLoadingMore(false));
    }else{
      apiGetEvents({
        author: true,
        limit: 2,
        'date[gte]': new Date().toISOString(),
        lat: region.latitude,
        lng: region.longitude,
        distance: 5,
        page
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.status && data.data && data.counts) {
          console.log('loadMoreEvents',{
            length:data.data.length,
            page,
            filter,
            counts:data.counts
          })
          setEvents((prevEvents) =>
            page !== 1
              ? [...(prevEvents ?? []), ...(data.data ?? [])]
              : data.data ?? []
          ); // Nối thêm dữ liệu mới
          
          setTotalCount(data.counts);
        }
      })
      .catch(err => console.log(ApiHelper.getMesErrorFromServer(err)))
      .finally(() => setIsLoadingMore(false));
    }
  };


  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    loadMoreEvents(1,filter); // Đặt lại trang về 1 khi làm mới
    setIsRefreshing(false); // Tắt trạng thái làm mới
  };

  // Hàm tải thêm dữ liệu khi cuộn đến cuối
  const handleLoadMoreEvents = () => {
    console.log({
      isLoading:!isLoading,
      isLoadingMore:!isLoadingMore,
      length:events.length,
      totalCount
    })
    if (!isLoading && !isLoadingMore && events.length < totalCount) {
      setPage((prevPage) => prevPage + 1); // Cập nhật số trang
    }
  };

  return (
    <ContainerComponent back title='Events' iconHeader={
      <RowComponent>
            <TouchableOpacity onPress={() => navigation.navigate('SearchEvents',{isFilter:false})}>
              <SearchNormal1 size={24} variant='TwoTone' color="black" />
            </TouchableOpacity>
            <SpaceComponent width={16}/>
            <TouchableOpacity>
              <Feather name="more-vertical" size={24} color="black" />
            </TouchableOpacity>
      </RowComponent>
     
    }>
        
        <SectionComponent>
            <FlatList 
              data={events}
              keyExtractor={(item) => item._id ?? randomUUID()}
              renderItem={({ item }) => <EventItem item={item} type='list' />}
              onEndReached={handleLoadMoreEvents} // Gọi khi cuộn đến cuối
              getItemLayout={(data, index) => ({
                length: 92, // Chiều cao mỗi item
                offset: 92 * index, // Tính toán vị trí của mỗi item
                index,
              })}
              onEndReachedThreshold={0.1} // Ngưỡng kích hoạt khi cuộn đến 10% cuối
              ListFooterComponent={isLoadingMore ? <ActivityIndicator /> : null} // Hiển thị spinner khi tải thêm
              refreshing={isRefreshing} // Trạng thái làm mới
              onRefresh={handleRefresh} // Hàm làm mới khi kéo xuống
            />
        </SectionComponent>
    </ContainerComponent>
  )
}

export default EventSeeAll