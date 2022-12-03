import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigator/RootStack";

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
