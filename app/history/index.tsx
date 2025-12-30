import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

import { workoutHistory } from "@/src/data/workoutHistory";
import { useTheme } from "@/src/theme/useTheme";

export default function HistoryScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        contentContainerStyle={styles.content}
        data={workoutHistory}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={[styles.title, { color: colors.text }]}>
            Historial de entrenamientos
          </Text>
        }
        renderItem={({ item }) => {
          const percent = Math.round(
            (item.exercisesCompleted / item.totalExercises) * 100
          );

          return (
            <Pressable
              style={[
                styles.card,
                {
                  backgroundColor: item.completed
                    ? colors.successBackground
                    : colors.card,
                  borderColor: item.completed
                    ? colors.successBorder
                    : colors.border,
                },
              ]}
              onPress={() => router.push(`/history/${item.id}`)}
            >
              <View style={styles.row}>
                <Text
                  style={[
                    styles.cardTitle,
                    { color: colors.text },
                  ]}
                >
                  {item.title}
                </Text>

                <Text style={{ color: colors.muted }}>
                  {percent}%
                </Text>
              </View>

              <Text
                style={[
                  styles.date,
                  { color: colors.muted },
                ]}
              >
                {new Date(item.date).toLocaleDateString("es-CR")}
              </Text>

              <Text
                style={[
                  styles.progress,
                  { color: colors.text },
                ]}
              >
                {item.exercisesCompleted} / {item.totalExercises} ejercicios
              </Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  date: {
    fontSize: 13,
    marginTop: 4,
  },
  progress: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
});
