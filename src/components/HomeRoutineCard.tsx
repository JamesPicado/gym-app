import { Text, StyleSheet, Pressable } from "react-native";
import { Card } from "./Card";
import { useTheme } from "../theme/useTheme";

export function HomeRoutineCard() {
  const { colors } = useTheme();

  return (
    <Card>
      <Text style={[styles.title, { color: colors.text }]}>
        Rutina de hoy
      </Text>

      <Text style={[styles.subtitle, { color: colors.text }]}>
        Pecho & Tríceps
      </Text>

      <Text style={styles.meta}>6 ejercicios · 45 min</Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Ver rutina</Text>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  meta: {
    color: "#9ca3af",
    marginBottom: 12,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
