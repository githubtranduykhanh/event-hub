// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@app_data';

// Lưu dữ liệu vào AsyncStorage
export const saveToStorage = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(`${STORAGE_KEY}_${key}`, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to AsyncStorage:', error);
    }
};

// Lấy dữ liệu từ AsyncStorage
export const getFromStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(`${STORAGE_KEY}_${key}`);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting from AsyncStorage:', error);
        return null;
    }
};

// Xóa dữ liệu khỏi AsyncStorage
export const removeFromStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(`${STORAGE_KEY}_${key}`);
    } catch (error) {
        console.error('Error removing from AsyncStorage:', error);
    }
};


// Xóa toàn bộ dữ liệu khỏi AsyncStorage
export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
    }
};
