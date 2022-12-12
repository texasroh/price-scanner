import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from "react-native";
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

const SearchBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  height: 55px;
`;

const TextInput = styled.TextInput`
  flex: 0.75;
  border-radius: 5px;
  background-color: white;
  padding: 0 10px;
`;

const SearchBtn = styled.TouchableOpacity`
  flex: 0.2;
  background-color: ${(props) => props.theme.btnBgColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const SearchBtnText = styled.View`
  color: ${(props) => props.theme.btnTextColor};
`;

/*
const ScanBtn = styled.TouchableOpacity`
  flex: 0.15;
  background-color: ${(props) => props.theme.btn2BgColor};
  justify-content: center;
  align-items: center;
  border-radius: 500px;
`;

const ScanBtnText = styled.Text`
  color: ${(props) => props.theme.btnTextColor};
  font-weight: 500;
  font-size: 24px;
`;
*/

const Section = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
`;

const ScanBtn2 = styled.Pressable`
  position: absolute;
  bottom: 80px;
  right: 50px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.btn2BgColor};
`;

const ScanBtnText2 = styled.Text`
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
  const [keyword, setKeyword] = useState("");
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

  const searchKeyword = () => {
    const key = keyword.trim().toLowerCase();
    setKeyword("");
    goToSearch(key);
  };

  return (
    <Container>
      <SearchBar>
        <TextInput
          autoCapitalize="none"
          placeholder="Search Keyword"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={searchKeyword}
        />
        <SearchBtn onPress={searchKeyword}>
          <SearchBtnText>
            <Ionicons name="search" size={18} />
          </SearchBtnText>
        </SearchBtn>
        {/* <ScanBtn onPress={() => navigate("Scan")}>
          <ScanBtnText>
            <Ionicons name="barcode-outline" size={28} />
          </ScanBtnText>
        </ScanBtn> */}
      </SearchBar>
      <Section>
        <SectionTitle>History</SectionTitle>
      </Section>
      {data.length > 0 ? (
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
      ) : (
        <Section>
          <SectionTitle>No history</SectionTitle>
        </Section>
      )}
      <ScanBtn2 onPress={() => navigate("Scan")}>
        <ScanBtnText2>
          <Ionicons name="barcode-outline" size={28} />
        </ScanBtnText2>
      </ScanBtn2>
    </Container>
  );
};

export default Home;
