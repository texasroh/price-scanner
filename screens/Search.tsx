import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components/native";
import { amazonCrawl } from "../api";
import EmptyItem from "../components/EmptyItem";
import Item, { IItem } from "../components/Item";
import { RootStackParamList } from "../navigator/RootStack";

const Container = styled.ScrollView`
  padding: 10px;
`;

interface IData {
  [key: string]: IItem;
}

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

  const { isLoading: amazonLoading, data: amazonData } = useQuery(
    ["amazon", barcode],
    amazonCrawl
  );

  return (
    <Container>
      {amazonLoading || !amazonData?.link ? (
        <EmptyItem market="amazon.com" loading={amazonLoading} />
      ) : (
        <Item
          market="amazon.com"
          img_src={amazonData?.img_src}
          link={amazonData?.link}
          title={amazonData?.title}
          price={amazonData?.price}
        />
      )}
      <EmptyItem market="target" loading />
    </Container>
  );
};

export default Search;
