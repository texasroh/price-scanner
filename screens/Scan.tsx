import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList } from "../navigator/RootStack";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Scan: React.FC<NativeStackScreenProps<RootStackParamList, "Scan">> = ({
  navigation: { navigate, replace },
}) => {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, [setHasPermission]);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    replace("Search", { value: data });
  };

  if (hasPermission === null) {
    return (
      <Container>
        <ActivityIndicator size={48} />
      </Container>
    );
  }
  if (hasPermission === false) {
    return (
      <Container>
        <Text>No access to camera</Text>
      </Container>
    );
  }

  return (
    <Container>
      <BarCodeScanner
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.upc_a,
          BarCodeScanner.Constants.BarCodeType.upc_e,
          BarCodeScanner.Constants.BarCodeType.upc_ean,
        ]}
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </Container>
  );
};

export default Scan;
