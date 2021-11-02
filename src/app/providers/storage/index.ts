import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage implements LocalStorageInterface {
  setLocalStorage = async (
    key: string,
    data: Record<string, unknown> | string | number | boolean | Date | any,
  ): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error: any) {
      throw new Error(error);
    }
  };

  getLocalStorage = async (key: string): Promise<any> => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data !== null ? JSON.parse(data) : null;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  removeItemLocalStorage = async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  clearLocalStorage = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default new LocalStorage();
