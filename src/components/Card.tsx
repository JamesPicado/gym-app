import { View, StyleSheet } from "react-native";
import { useTheme } from "../theme/useTheme";

export function Card({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
});
