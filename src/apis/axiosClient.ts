import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import Constants from 'expo-constants';


// Tạo một instance của Axios
const instance: AxiosInstance = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl || 'http://192.168.1.14:5000', // Đảm bảo có giá trị mặc định cho baseURL
  paramsSerializer: params => queryString.stringify(params),
  headers: {
    'Accept': 'application/json', // Loại dữ liệu client mong muốn nhận về
    'Content-Type': 'application/json', // Loại dữ liệu mặc định cho các yêu cầu không có cấu hình Content-Type cụ thể
  },
});

// Interceptor cho yêu cầu (request)
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Thêm header Authorization nếu cần
    if (config.headers) {
      config.headers.Authorization = `Bearer reactnative`;
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
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    // Xử lý lỗi phản hồi
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Xử lý lỗi không được xác thực
        console.error('Unauthorized access - please login');
      } else if (status === 403) {
        // Xử lý lỗi cấm truy cập
        console.error('Access forbidden - you do not have permission');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
