import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export default class NotificationService {
  private static _instance: NotificationService;
  private _notificationListener: any;
  private _responseListener: any;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService._instance) {
      NotificationService._instance = new NotificationService();
    }
    return NotificationService._instance;
  }

  // Yêu cầu quyền gửi thông báo và lấy Expo Push Token
  async registerForPushNotificationsAsync(): Promise<string | null> {
    let token: string | null = null;

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notifications!');
        return null;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use a physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  // Đăng ký listener nhận thông báo khi app đang hoạt động
  public addNotificationReceivedListener(callback: (notification: Notifications.Notification) => void) {
    this._notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      callback(notification);
    });
  }

  // Đăng ký listener xử lý khi người dùng tương tác với thông báo
  public addNotificationResponseReceivedListener(callback: (response: Notifications.NotificationResponse) => void) {
    this._responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      callback(response);
    });
  }

  // Xóa các listener khi không cần thiết
  public removeListeners() {
    if (this._notificationListener) {
      this._notificationListener.remove();
    }
    if (this._responseListener) {
      this._responseListener.remove();
    }
  }
}
