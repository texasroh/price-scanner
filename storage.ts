import AsyncStorage from "@react-native-async-storage/async-storage";

const SEARCH_LIST = "search_list";

export const storeHistory = async (value: any) => {
  try {
    await AsyncStorage.setItem(SEARCH_LIST, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const addHistory = async (value: any) => {};

export const loadHistory = async () => {
  try {
    const value = await AsyncStorage.getItem(SEARCH_LIST);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
