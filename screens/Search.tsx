import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Button } from "react-native";
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
  return null;
};

export default Search;
