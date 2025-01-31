import { Stack } from "expo-router";
import "./global.css";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/WelcomeScreen" options={{ title: "Welcome" }} />
      <Stack.Screen name="screens/FlightSearchScreen" options={{ title: "Search Flight" }} />
      <Stack.Screen name="screens/ChatRoomScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
