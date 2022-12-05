import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import RootStack from "./navigator/RootStack";
import { darkTheme, lightTheme } from "./theme";

const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === "dark";
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          {/* <StatusBar style="dark" /> */}
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
