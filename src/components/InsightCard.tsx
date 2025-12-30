import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/useTheme";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  accent?: string;
};

export function InsightCard({
  icon,
  title,
  description,
  accent,
}: Props) {
  const { colors, isDark } = useTheme();
  const accentColor = accent || colors.primary;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: isDark ? "transparent" : accentColor + "22",
        },
      ]}
    >
      {/* ICON */}
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor: accentColor + "22",
          },
        ]}
      >
        <Ionicons name={icon} size={20} color={accentColor} />
      </View>

      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.description, { color: colors.muted }]}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
  },

  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },

  description: {
    fontSize: 13,
    lineHeight: 18,
  },
});
