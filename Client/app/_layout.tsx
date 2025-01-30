import { Stack } from "../$node_modules/expo-router/build/index.js";
import "./global.css";

export default function Layout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
