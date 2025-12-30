import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/useTheme";
import { useRouter } from "expo-router";

export function HomeQuickActions() {
  const { colors } = useTheme();
  const router = useRouter();

  const Action = ({ icon, label, onPress }: any) => (
    <Pressable style={[styles.action, { backgroundColor: colors.card }]} onPress={onPress}>
      <Ionicons name={icon} size={22} color={colors.text} />
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.row}>
      <Action icon="barbell" label="Rutinas" onPress={() => router.push("/(tabs)/routines")} />
      <Action icon="stats-chart" label="Progreso" onPress={() => router.push("/(tabs)/progress")} />
      <Action icon="add-circle" label="Registrar" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  action: {
    flex: 1,
    marginHorizontal: 6,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  label: { marginTop: 6, fontSize: 12, fontWeight: "600" },
});
