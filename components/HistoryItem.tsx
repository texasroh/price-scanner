import React from "react";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom-width: 1px;

  border-color: white;
`;

const Value = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const DeleteBtn = styled.TouchableOpacity``;

const DeleteBtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

interface IHistoryItem {
  value: string;
  onDelete: (value: string) => void;
}

const HistoryItem: React.FC<IHistoryItem> = ({ value, onDelete }) => {
  const onPress = (value: string) => {
    onDelete(value);
  };
  return (
    <Container>
      <Value>{value}</Value>
      <DeleteBtn>
        <DeleteBtnText onPress={() => onPress(value)}>
          <Ionicons name="trash-bin-outline" />
        </DeleteBtnText>
      </DeleteBtn>
    </Container>
  );
};

export default HistoryItem;
