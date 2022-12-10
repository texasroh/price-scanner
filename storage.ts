import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const SEARCH_HISTORY = "search_history";

// export const useHistory = () => {
//   const [history, setHistory] = useState<string[]>([]);
//   useEffect(() => {
//     loadHistory().then((his) => setHistory(his));
//   }, []);

//   const addHistory = (his: string) => {
//     const newHistory = history.filter((value: string) => value !== his);
//     newHistory.unshift(his);
//     storeHistory(newHistory);
//     setHistory(newHistory);
//   };

//   const getHistory = () => history;
//   return { history, addHistory, getHistory };
// };

export const addHistory = async (value: string) => {
  const history = await loadHistory();
  const newHistory = history.filter((item: string) => item !== value);
  newHistory.unshift(value);
  storeHistory(newHistory);
};

export const deleteHistory = async (value: string) => {
  const history = await loadHistory();
  const newHistory = history.filter((item: string) => item !== value);
  storeHistory(newHistory);
};

const storeHistory = async (value: string[]) => {
  try {
    await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const loadHistory = async () => {
  try {
    const value = await AsyncStorage.getItem(SEARCH_HISTORY);
    return value != null ? JSON.parse(value) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};
