import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import { amazonCrawl, targetCrawl } from "../api";
import EmptyItem from "../components/EmptyItem";
import Item, { IItem } from "../components/Item";
import { RootStackParamList } from "../navigator/RootStack";
import { addHistory } from "../storage";
import { darkTheme, lightTheme } from "../theme";

const Container = styled.ScrollView`
  padding: 10px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

interface IData {
  [key: string]: IItem;
}

const Search: React.FC<
  NativeStackScreenProps<RootStackParamList, "Search">
> = ({
  navigation: { setOptions },
  route: {
    params: { value },
  },
}) => {
  const isDark = useColorScheme() === "dark";
  useEffect(() => {
    setOptions({
      headerShown: true,
      headerTitle: value,
      headerStyle: {
        backgroundColor: isDark
          ? darkTheme.backgroundColor
          : lightTheme.backgroundColor,
      },
      headerTitleStyle: {
        color: isDark ? darkTheme.textColor : lightTheme.textColor,
      },
      headerTintColor: isDark ? darkTheme.textColor : lightTheme.textColor,
      headerBackTitleVisible: false,
    });
    addHistory(value);
  }, []);

  const { isLoading: amazonLoading, data: amazonData } = useQuery(
    ["amazon", value],
    amazonCrawl
  );

  const { isLoading: targetLoading, data: targetData } = useQuery(
    ["target", value],
    targetCrawl
  );

  return (
    <Container>
      {amazonLoading || !amazonData?.link ? (
        <EmptyItem market="amazon.com" loading={amazonLoading} />
      ) : (
        <Item
          market="amazon.com"
          img_src={amazonData.img_src}
          link={amazonData.link}
          title={amazonData.title}
          price={amazonData.price}
        />
      )}
      {targetLoading || !targetData?.link ? (
        <EmptyItem market="target" loading={targetLoading} />
      ) : (
        <Item
          market="target"
          img_src={targetData.img_src}
          link={targetData.link}
          title={targetData.title}
          price={targetData.price}
        />
      )}
    </Container>
  );
};

export default Search;
