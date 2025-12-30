import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/useTheme";

type MuscleStat = {
  muscle: string;
  sessions: number;
  percentage: number;
};

type Props = {
  data: MuscleStat[];
};

export function MuscleStatsCard({ data }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Estadística por músculo
      </Text>

      {data.map((item) => (
        <View key={item.muscle} style={styles.row}>
          <View style={styles.labelRow}>
            <Text style={[styles.muscle, { color: colors.text }]}>
              {item.muscle}
            </Text>
            <Text style={[styles.percent, { color: colors.muted }]}>
              {item.percentage}%
            </Text>
          </View>

          <View style={styles.barBackground}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${item.percentage}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 16,
  },

  row: {
    marginBottom: 14,
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  muscle: {
    fontSize: 14,
    fontWeight: "600",
  },

  percent: {
    fontSize: 13,
  },

  barBackground: {
    height: 8,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    borderRadius: 8,
  },
});
