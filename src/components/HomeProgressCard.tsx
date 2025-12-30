import { Text, View, StyleSheet } from "react-native";
import { Card } from "./Card";
import { useTheme } from "../theme/useTheme";

export function HomeProgressCard() {
  const { colors } = useTheme();

  return (
    <Card>
      <Text style={[styles.title, { color: colors.text }]}>
        Progreso
      </Text>

      <View style={styles.row}>
        <View>
          <Text style={[styles.value, { color: colors.text }]}>72 kg</Text>
          <Text style={styles.label}>Peso</Text>
        </View>

        <View>
          <Text style={[styles.value, { color: colors.text }]}>+4%</Text>
          <Text style={styles.label}>Fuerza</Text>
        </View>

        <View>
          <Text style={[styles.value, { color: colors.text }]}>12</Text>
          <Text style={styles.label}>Sesiones</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  label: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
});
