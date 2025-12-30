import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { userWorkouts } from "@/src/data/userWorkouts";

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function ProgressionScreen() {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();

  const exercise = userWorkouts
    .flatMap(d => d.exercises)
    .find(e => e.id === exerciseId);

  if (!exercise || !exercise.history) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Progresión de peso</Text>
        <Text style={styles.subtitle}>{exercise.name}</Text>

        {exercise.history.map((h, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.date}>{formatDate(h.date)}</Text>
            <Text style={styles.weight}>{h.weight} kg</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  date: {
    fontSize: 14,
  },
  weight: {
    fontSize: 16,
    fontWeight: "700",
  },
});
