import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/useTheme";

type Props = {
  label: string;
  value: string;
  accent: string;
  icon?: string;
};

export function ProgressKpiCard({ label, value, accent, icon }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.value, { color: accent }]}>{value}</Text>
      <Text style={[styles.label, { color: colors.muted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
    marginBottom: 6,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
