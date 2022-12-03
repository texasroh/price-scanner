import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Scan from "../screens/Scan";

export type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
};

const nav = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <nav.Navigator>
      <nav.Screen name="Home" component={Home} />
      <nav.Screen name="Scan" component={Scan} />
    </nav.Navigator>
  );
};

export default RootStack;
