import axiosClient from './axiosClient'


export const apiLogin = () => axiosClient({
    url:'/',
    method:'get', 
})
    
