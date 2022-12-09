import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList } from "../navigator/RootStack";
import { useHistory } from "../storage";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  padding-top: 50px;
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

const Home: React.FC<NativeStackScreenProps<RootStackParamList, "Home">> = ({
  navigation: { navigate },
}) => {
  const [data, setData] = useState<string[]>([]);
  const { history } = useHistory();
  useEffect(() => {
    console.log("test");
    setData(history);
  });

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text style={{ color: "white" }}>{item}</Text>
          </View>
        )}
      />
      <ScanBtn onPress={() => navigate("Scan")}>
        <ScanBtnText>+</ScanBtnText>
      </ScanBtn>
    </Container>
  );
};

export default Home;
