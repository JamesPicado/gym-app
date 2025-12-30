import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../theme/useTheme";

export function HomeLoading() {
  const { colors } = useTheme();
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.text} />
      <Text style={styles.text}>Cargando tu información…</Text>
    </View>
  );
}

export function HomeEmpty() {
  const { colors } = useTheme();
  return (
    <View style={styles.center}>
      <Text style={[styles.title, { color: colors.text }]}>
        Aún no hay actividad
      </Text>
      <Text style={styles.text}>
        Empieza asignando tu primera rutina 💥
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { padding: 24, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  text: { fontSize: 13, color: "#9ca3af", textAlign: "center" },
});
