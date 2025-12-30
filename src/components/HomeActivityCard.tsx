import { Text, StyleSheet } from "react-native";
import { Card } from "./Card";
import { useTheme } from "../theme/useTheme";

export function HomeActivityCard() {
  const { colors } = useTheme();

  return (
    <Card>
      <Text style={[styles.title, { color: colors.text }]}>
        Última actividad
      </Text>

      <Text style={[styles.activity, { color: colors.text }]}>
        ✔ Rutina Piernas completada
      </Text>

      <Text style={styles.time}>Hace 2 horas</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 10,
  },
  activity: {
    fontSize: 16,
    fontWeight: "600",
  },
  time: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
});
