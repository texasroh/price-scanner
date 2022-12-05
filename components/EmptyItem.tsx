import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Card = styled.View`
  border-color: black;
  border-width: 1px;
  border-radius: 10px;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Market = styled.Text`
  font-weight: 600;
`;

const NotAvailable = styled.Text``;

interface IEmptyItem {
  market: string;
  loading: boolean;
}

const EmptyItem = ({ market, loading }: IEmptyItem) => {
  return (
    <Card>
      <Market>{market}</Market>
      {loading ? (
        <ActivityIndicator size={24} />
      ) : (
        <NotAvailable>No result</NotAvailable>
      )}
    </Card>
  );
};

export default EmptyItem;
