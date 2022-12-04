import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Scan from "../screens/Scan";
import Search from "../screens/Search";

export type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  Search: { barcode: string };
};

const nav = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <nav.Navigator screenOptions={{ headerShown: false }}>
      <nav.Screen name="Home" component={Home} />
      <nav.Screen name="Scan" component={Scan} />
      <nav.Screen name="Search" component={Search} />
    </nav.Navigator>
  );
};

export default RootStack;
