import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import RootStack from "./navigator/RootStack";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* <StatusBar style="dark" /> */}
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
