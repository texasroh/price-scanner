import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import RootStack from "./navigator/RootStack";

export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar style="dark" /> */}
      <RootStack />
    </NavigationContainer>
  );
}
