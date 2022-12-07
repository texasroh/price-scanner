import { Linking, TouchableOpacity, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { darkTheme, lightTheme } from "../theme";

export interface IItem {
  market: string;
  title?: string;
  img_src?: string;
  link?: string;
  price?: string;
}

const Card = styled.View`
  border-color: ${(props) => props.theme.textColor};
  border-width: 1px;
  border-radius: 10px;
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  max-height: 120px;
  margin-bottom: 10px;
`;

const Image = styled.Image`
  flex: 0.3;
  min-height: 100px;
  object-fit: scale-down;
  border-radius: 10px;
`;

const Info = styled.View`
  flex: 0.6;
`;

const MarketWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Market = styled.Text`
  margin-bottom: 10px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Title = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
`;

const Price = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Item = ({ market, title = "", img_src, link, price }: IItem) => {
  const isDark = useColorScheme() === "dark";
  const goToLink = () => {
    if (link) {
      Linking.openURL(link);
    }
  };
  return (
    <TouchableOpacity onPress={goToLink}>
      <Card>
        <Image source={{ uri: img_src }} />
        <Info>
          <MarketWrapper>
            <Market>{market}</Market>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={isDark ? darkTheme.textColor : lightTheme.textColor}
            />
          </MarketWrapper>
          <Title>
            {title.length > 50 ? `${title.slice(0, 50)}...` : title}
          </Title>
          <Price>{price}</Price>
        </Info>
      </Card>
    </TouchableOpacity>
  );
};

export default Item;
