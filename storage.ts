import AsyncStorage from "@react-native-async-storage/async-storage";

const SEARCH_HISTORY = "search_history";

export const storeHistory = async (value: any) => {
  try {
    await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const addHistory = async (value: any) => {
  try {
    await AsyncStorage.mergeItem(SEARCH_HISTORY, JSON.stringify(value));
    loadHistory();
  } catch (e) {
    console.log(e);
  }
};

export const loadHistory = async () => {
  try {
    const value = await AsyncStorage.getItem(SEARCH_HISTORY);
    console.log(value);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteHistory = async () => {};

export const deleteAllHistory = async () => {};
