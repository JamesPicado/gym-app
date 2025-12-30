import { Stack } from "expo-router";
import { ThemeProvider } from "@/src/theme/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="routine-day/[id]" />
        <Stack.Screen name="progression/[exerciseId]" />
      </Stack>
    </ThemeProvider>
  );
}
