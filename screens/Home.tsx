import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList } from "../navigator/RootStack";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
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
  return (
    <Container>
      <ScanBtn onPress={() => navigate("Scan")}>
        <ScanBtnText>+</ScanBtnText>
      </ScanBtn>
    </Container>
  );
};

export default Home;
