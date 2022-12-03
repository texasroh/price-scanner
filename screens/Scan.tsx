import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList } from "../navigator/RootStack";

const Container = styled.View`
  flex: 1;
`;

const Scan: React.FC<
  NativeStackScreenProps<RootStackParamList, "Scan">
> = () => {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <BarCodeScanner
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.upc_a,
          BarCodeScanner.Constants.BarCodeType.upc_e,
          BarCodeScanner.Constants.BarCodeType.upc_ean,
        ]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </Container>
  );
};

export default Scan;
