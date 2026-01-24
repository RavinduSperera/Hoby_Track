import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Colors } from "../constants/Colors";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

import { HabitProvider } from "../context/HabitContext";
import { SidebarProvider } from "../context/SidebarContext";
import { UserProvider } from "../context/UserContext";
import { Sidebar } from "../components/Sidebar";

export default function RootLayout() {
  return (
    <HabitProvider>
      <UserProvider>
        <SidebarProvider>
          <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <StatusBar style="light" />
            <Stack
              initialRouteName="index"
              screenOptions={{
                headerStyle: {
                  backgroundColor: Colors.background,
                },
                headerTintColor: Colors.text,
                headerShadowVisible: false, // Clean look
                contentStyle: {
                  backgroundColor: Colors.background,
                },
                animation: 'slide_from_right', // Smooth transition
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="select-avatar" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <Sidebar />
          </View>
        </SidebarProvider>
      </UserProvider>
    </HabitProvider>
  );
}
