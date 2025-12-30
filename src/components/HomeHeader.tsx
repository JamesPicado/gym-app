import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/useTheme";

export function HomeHeader({ name = "James" }: { name?: string }) {
  const { colors } = useTheme();
  const today = new Date().toLocaleDateString("es-CR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.greeting, { color: colors.text }]}>
        Hola, {name} 💪
      </Text>
      <Text style={styles.date}>{today}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  greeting: { fontSize: 24, fontWeight: "700" },
  date: { fontSize: 13, color: "#9ca3af", marginTop: 4 },
});
