import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const SEARCH_HISTORY = "search_history";

export const useHistory = () => {
  const [history, setHistory] = useState<string[]>(["a"]);
  useEffect(() => {
    loadHistory().then((his) => setHistory(his));
    console.log("loadhistory");
  }, []);

  useEffect(() => {
    storeHistory(history);
    console.log("store history", history);
  }, [history]);

  const addHistory = (his: string) => {
    console.log("addhistory", his, history);
    setHistory([his, ...history]);
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
