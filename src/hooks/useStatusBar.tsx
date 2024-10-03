import { useEffect } from 'react';
import { StatusBar, StatusBarStyle, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import React from 'react';

const useStatusBar = (
  style: StatusBarStyle = 'dark-content',
  backgroundColor: string = 'transparent',
  isHidden: boolean = false,
  isTranslucent: boolean = true
) => {
  useFocusEffect(
    React.useCallback(() => {
      // Cập nhật style và màu của StatusBar khi trang focus
      StatusBar.setBarStyle(style);
      StatusBar.setHidden(isHidden);

      // Chỉ gọi setTranslucent trên Android
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(backgroundColor);
        StatusBar.setTranslucent(isTranslucent);
      }

      return () => {
        // Có thể đặt các hành động cleanup ở đây nếu cần khi trang unfocus
      };
    }, [style, backgroundColor, isHidden, isTranslucent])
  );
};

export default useStatusBar;
