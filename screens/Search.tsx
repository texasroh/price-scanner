import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "react-native";
import { amazonCrawl } from "../api";
import { RootStackParamList } from "../navigator/RootStack";

const Search: React.FC<
  NativeStackScreenProps<RootStackParamList, "Search">
> = ({
  navigation: { setOptions },
  route: {
    params: { barcode },
  },
}) => {
  useEffect(() => {
    setOptions({
      headerShown: true,
      headerTitle: barcode,
    });
  }, []);

  useQuery(["amazon", barcode], amazonCrawl);
  return null;
};

export default Search;
