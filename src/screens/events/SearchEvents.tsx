import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  CircleComponent,
  ContainerComponent,
  EventItem,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TagComponent,
} from "~/components";
import { SearchNormal1, Sort } from "iconsax-react-native";
import { EventModel } from "~/models";
import { randomUUID } from "expo-crypto";
import { Feather } from "@expo/vector-icons";
import { colors, typography } from "~/styles";
import { useFocusEffect } from "@react-navigation/native";
import { apiGetEvents } from "~/apis";
import { ApiHelper } from "~/apis/helper";
import { set } from "lodash";
import { useDebounce } from "~/hooks";

const SearchEvents = ({ navigation, route }: any) => {
  const { isFilter }: { isFilter: boolean } = route.params;
  const [events, setEvents] = useState<EventModel[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false); // Tải thêm dữ liệu
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // Làm mới dữ liệu
  const searchDebounce = useDebounce(search,500)
  // Hàm để tải thêm sự kiện
  const loadMoreEvents = (page: number) => {
    setIsLoadingMore(true);
    apiGetEvents({
      author: true,
      limit: 2,
      page, // Tăng số trang mỗi khi gọi thêm
    })
      .then((res) => res.data)
      .then((data) => {
        if (data.status && data.data && data.counts) {
          console.log('loadMoreEvents',{
            length:data.data.length,
            page
          })
          setEvents((prevEvents) =>
            page !== 1
              ? [...(prevEvents ?? []), ...(data.data ?? [])]
              : data.data ?? []
          ); // Nối thêm dữ liệu mới
          setTotalCount(data.counts);
        }
      })
      .catch((err) => console.log(ApiHelper.getMesErrorFromServer(err)))
      .finally(() => setIsLoadingMore(false));
  };


  const searchEvents = (title: string) => {
    setIsLoadingMore(true);
    apiGetEvents({
      author: true,
      title
    })
      .then((res) => res.data)
      .then((data) => {
        if (data.status && data.data && data.counts) {
          console.log('loadMoreEvents',{
            length:data.data.length,
            page
          })
          setEvents(data.data); // Nối thêm dữ liệu mới
          setTotalCount(data.counts);
        }
      })
      .catch((err) => console.log(ApiHelper.getMesErrorFromServer(err)))
      .finally(() => setIsLoadingMore(false));
  };

  // Hàm làm mới dữ liệu
  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    loadMoreEvents(1); // Đặt lại trang về 1 khi làm mới
    setIsRefreshing(false); // Tắt trạng thái làm mới
  };

  // Hàm tải thêm dữ liệu khi cuộn đến cuối
  const handleLoadMoreEvents = () => {
    if (!isLoading && !isLoadingMore && events.length < totalCount) {
      setPage((prevPage) => prevPage + 1); // Cập nhật số trang
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadMoreEvents(1)
      setIsLoading(false);
      return () => {
        setPage(1);
        setTotalCount(0);
        setSearch("");
        setEvents([]);
        setIsLoading(false);
        setIsLoadingMore(false);
      };
    }, [isFilter])
  );

  useEffect(() => {
    if(page > 1) loadMoreEvents(page); // Tải thêm dữ liệu khi page tăng
  }, [page]);

  useEffect(() => {
    if(searchDebounce === '') {
      handleRefresh(); // Tải thêm dữ liệu khi page tăng
    }else {
      searchEvents(searchDebounce)
    }
  }, [searchDebounce]);

  return (
    <ContainerComponent back title="Search">
      <SectionComponent>
        <RowComponent>
          <RowComponent styles={{ flex: 1, height: "100%" }}>
            <SearchNormal1 size={24} variant="TwoTone" color={colors.primary} />
            <SpaceComponent
              width={1}
              height="100%"
              color={colors.primary}
              style={{ marginLeft: 10 }}
            />
            <InputComponent
              styles={{
                flex: 1,
                borderWidth: 0,
                paddingHorizontal: 7,
                paddingVertical: 4,
              }}
              styleInput={{ fontSize: typography.fontSizeLarge }}
              allowClear
              value={search}
              onChange={(val) => setSearch(val)}
              placeholder="Search..."
            />
          </RowComponent>
          <TagComponent
            bgColor={colors.primary}
            lable="Filters"
            icon={
              <CircleComponent size={23} color={colors.white}>
                <Sort
                  size={typography.fontSizeMedium}
                  variant="Outline"
                  color={colors.primary}
                />
              </CircleComponent>
            }
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{ flex: 1 }}>
        <FlatList
          data={events}
          keyExtractor={(item) => item._id ?? randomUUID()}
          renderItem={({ item }) => <EventItem item={item} type="list" />}
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
  );
};

export default SearchEvents;
