import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useTheme } from "@/src/theme/useTheme";
import { workoutHistory } from "@/src/data/workoutHistory";



export default function HistoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();

  const session = workoutHistory.find(
    (item) => item.id === id
  );

  if (!session) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ color: colors.text }}>
            Sesión no encontrada
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          {session.title}
        </Text>

        <Text style={[styles.date, { color: colors.muted }]}>
          {new Date(session.date).toLocaleDateString("es-CR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>

        <View
          style={[
            styles.statusBox,
            {
              backgroundColor: session.completed
                ? colors.successBackground
                : colors.card,
              borderColor: session.completed
                ? colors.successBorder
                : colors.border,
            },
          ]}
        >
          <Text style={[styles.statusText, { color: colors.text }]}>
            {session.completed
              ? "Rutina completada ✅"
              : "Rutina incompleta"}
          </Text>

          <Text style={[styles.statusSub, { color: colors.muted }]}>
            {session.exercisesCompleted} de{" "}
            {session.totalExercises} ejercicios realizados
          </Text>
        </View>

        <View style={[styles.summary, { backgroundColor: colors.card }]}>
          <Text
            style={[
              styles.summaryTitle,
              { color: colors.text },
            ]}
          >
            Resumen
          </Text>

          <Text style={[styles.summaryItem, { color: colors.text }]}>
            📊 Progreso:{" "}
            {Math.round(
              (session.exercisesCompleted /
                session.totalExercises) *
                100
            )}
            %
          </Text>

          <Text style={[styles.summaryItem, { color: colors.text }]}>
            🏋️ Ejercicios totales: {session.totalExercises}
          </Text>
        </View>
      </ScrollView>
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
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    marginBottom: 20,
  },
  statusBox: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  statusSub: {
    fontSize: 13,
  },
  summary: {
    padding: 16,
    borderRadius: 14,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  summaryItem: {
    fontSize: 14,
    marginBottom: 4,
  },
});
