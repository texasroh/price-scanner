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

const CodeBtn = styled.TouchableOpacity``;

const Value = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
`;

const DeleteBtn = styled.TouchableOpacity``;

const DeleteBtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

interface IHistoryItem {
  value: string;
  onDelete: (value: string) => void;
  goToSearch: (value: string) => void;
}

const HistoryItem: React.FC<IHistoryItem> = ({
  value,
  onDelete,
  goToSearch,
}) => {
  const onPress = (value: string) => {
    onDelete(value);
  };
  return (
    <Container>
      <CodeBtn onPress={() => goToSearch(value)}>
        <Value>{value.length < 20 ? value : `${value.slice(0, 20)}...`}</Value>
      </CodeBtn>
      <DeleteBtn>
        <DeleteBtnText onPress={() => onPress(value)}>
          <Ionicons name="trash-outline" size={24} />
        </DeleteBtnText>
      </DeleteBtn>
    </Container>
  );
};

export default HistoryItem;
