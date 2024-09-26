// axios.d.ts
import 'axios';

// Mở rộng InternalAxiosRequestConfig để thêm thuộc tính _retry
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}
