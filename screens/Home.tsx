import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, LayoutAnimation, Platform, UIManager } from "react-native";
import styled from "styled-components/native";
import HistoryItem from "../components/HistoryItem";
import { RootStackParamList } from "../navigator/RootStack";
import { deleteHistory, loadHistory } from "../storage";
import Ionicons from "@expo/vector-icons/Ionicons";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  padding-top: 60px;
`;

const ScanBtn = styled.Pressable`
  position: absolute;
  bottom: 80px;
  right: 50px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.btnBgColor};
`;

const ScanBtnText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.btnTextColor};
`;

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Home: React.FC<NativeStackScreenProps<RootStackParamList, "Home">> = ({
  navigation: { navigate },
}) => {
  const [data, setData] = useState<string[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const load = async () => {
        const history = await loadHistory();
        LayoutAnimation.spring();
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setData(history);
      };
      load();
    }, [setData])
  );

  const onDelete = (value: string) => {
    deleteHistory(value);
    const newData = data.filter((item) => item !== value);
    LayoutAnimation.spring();
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setData(newData);
  };

  const goToSearch = (value: string) => {
    navigate("Search", { value });
  };

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <HistoryItem
            value={item}
            onDelete={onDelete}
            goToSearch={goToSearch}
          />
        )}
      />
      <ScanBtn onPress={() => navigate("Scan")}>
        <ScanBtnText>+</ScanBtnText>
      </ScanBtn>
    </Container>
  );
};

export default Home;
