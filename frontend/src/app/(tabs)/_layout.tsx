import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // We have a custom header
                tabBarStyle: {
                    backgroundColor: Colors.surface,
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 80, // Taller size to accommodate home indicator
                    paddingBottom: 20, // Lift content up
                    paddingTop: 10,
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textSecondary,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeIcon : null}>
                            <Feather name="grid" size={24} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Create",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeIcon : null}>
                            <Feather name="plus-circle" size={24} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeIcon : null}>
                            <Feather name="user" size={24} color={color} />
                        </View>
                    ),
                }}
            />
            {/* Hide the index route if it exists, or just don't have one if we use redirects */}
            <Tabs.Screen
                name="index"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    activeIcon: {
        // Optional: Add glow or background for active state if needed in future
        // shadowColor: Colors.primary,
        // shadowOpacity: 0.5,
        // shadowRadius: 10,
    }
});
