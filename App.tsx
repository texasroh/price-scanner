import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import RootStack from "./navigator/RootStack";
import { darkTheme, lightTheme } from "./theme";
import codePush from "react-native-code-push";

const queryClient = new QueryClient();

const App = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default codePush(App);
