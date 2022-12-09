import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const SEARCH_HISTORY = "search_history";

export const useHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => {
    loadHistory().then((his) => setHistory(his));
  }, []);

  //   useEffect(() => {
  //     console.log("useeffect history");
  //     storeHistory(history).then(() => {
  //       console.log("store history", history);
  //     });
  //   }, [history]);

  const addHistory = (his: string) => {
    const newHistory = [his, ...history];
    storeHistory(newHistory); //.then(() => setHistory(newHistory));
    setHistory(newHistory);
    console.log("addhistory", his, history);
  };
  return { history, addHistory };
};

const storeHistory = async (value: string[]) => {
  try {
    await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(value));
    console.log("storeHistory", value);
  } catch (e) {
    console.log(e);
  }
};

const loadHistory = async () => {
  try {
    const value = await AsyncStorage.getItem(SEARCH_HISTORY);
    return value != null ? JSON.parse(value) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};
