import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import Constants from 'expo-constants';
import { getFromStorage, saveToStorage } from '~/utils/storage';
import { UserSlice } from '~/redux/features/auth/authSlice';


// Tạo một instance của Axios
const instance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_APP_API_URL || 'http://192.168.1.3:5000/api', // Đảm bảo có giá trị mặc định cho baseURL
  paramsSerializer: params => queryString.stringify(params),
  headers: {
    'Accept': 'application/json', // Loại dữ liệu client mong muốn nhận về
    'Content-Type': 'application/json', // Loại dữ liệu mặc định cho các yêu cầu không có cấu hình Content-Type cụ thể
  },
});

// Interceptor cho yêu cầu (request)
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Thêm header Authorization nếu cần
    if (config.headers) {
      const storedUser:UserSlice = await getFromStorage('auth');
      if(storedUser) config.headers.Authorization = `Bearer ${storedUser.accessToken}`;  
    }
    return config;
  },
  (error: AxiosError) => {
    // Xử lý lỗi yêu cầu
    return Promise.reject(error);
  }
);

// Interceptor cho phản hồi (response)
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Xử lý lỗi phản hồi
    if (error.response) {
      const { status,data } = error.response;
      const originalRequest = error.config;
      if (originalRequest  && status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Xử lý lỗi không được xác thực
        const errorData = data as {success:boolean,mes:string}
       
        if(errorData.mes === 'TokenExpiredError'){
            const storedUser:UserSlice = await getFromStorage('auth');
            if(storedUser && storedUser.refreshToken){
              try {
                const response = await axios.post(`${instance.defaults.baseURL}/auth/refresh-token`, {
                  token: storedUser.refreshToken,
                });
    
                if (response.status === 200) {
                  const { accessToken, refreshToken } = response.data;
    
                  // Cập nhật token mới vào AsyncStorage
                  await saveToStorage('auth', { ...storedUser, accessToken, refreshToken });
    
                  // Cập nhật lại token trong header và thực hiện lại request
                  originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                  return instance(originalRequest); // Thực hiện lại request với token mới
                }
              } catch (refreshError) {
                console.error('Error refreshing token: ', refreshError);
                return Promise.reject(refreshError);
              }
            }
        }else{
          console.error(data ? errorData.mes :'Unauthorized access - please login');
        }
      } else if (status === 403) {
        // Xử lý lỗi cấm truy cập
        console.error('Access forbidden - you do not have permission');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
