import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useMemo, useState } from "react";
import { useTheme } from "../../src/theme/useTheme";
import { userWorkouts } from "../../src/data/userWorkouts";
import { useRouter } from "expo-router";

function parseLocalDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function UserRoutinesScreenAlt() {
  const { colors } = useTheme();
  const [tab, setTab] = useState<"next" | "past">("next");
  const router = useRouter();

  /**
   * ───────── FECHA DE HOY NORMALIZADA ─────────
   */
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  /**
   * ───────── FILTRADO POR FECHA ─────────
   * No modifica data original
   */
  const filteredWorkouts = useMemo(() => {
    return userWorkouts
      .map((day, originalIndex) => ({ day, originalIndex }))
      .filter(({ day }) => {
        const d = parseLocalDate(day.date);

        if (tab === "next") {
          return d >= today && day.status !== "completed";
        }

        // Pasados: cualquier fecha anterior a hoy o marcados completados
        return d < today || day.status === "completed";
      });
  }, [tab, today]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Entrenamientos
          </Text>
          <Text style={styles.subtitle}>Agenda asignada</Text>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          <Tab
            label="Próximos"
            active={tab === "next"}
            onPress={() => setTab("next")}
          />
          <Tab
            label="Pasado"
            active={tab === "past"}
            onPress={() => setTab("past")}
          />
        </View>

        {/* DAYS */}
        {filteredWorkouts.map(({ day, originalIndex }) => {
          const isRest = day.status === "rest";
          const isCompleted = day.status === "completed";

          return (
            <Pressable
              key={`${day.date}-${originalIndex}`}
              disabled={isRest}
              onPress={() => router.push(`/routine-day/${originalIndex}`)}
              style={[
                styles.dayCard,
                { backgroundColor: colors.card },
                isRest && styles.restCard,
              ]}
            >
              {/* INDICADOR LATERAL */}
              <View
                style={[
                  styles.indicator,
                  isCompleted && styles.completed,
                  isRest && styles.rest,
                ]}
              />

              <View style={styles.dayContent}>
                <Text style={[styles.date, { color: colors.text }]}>
                  {parseLocalDate(day.date).toLocaleDateString("es-CR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </Text>

                <Text style={[styles.dayTitle, { color: colors.text }]}>
                  {day.title}
                </Text>

                {isRest ? (
                  <Text style={styles.restText}>Día de descanso</Text>
                ) : (
                  <Text style={styles.exerciseCount}>
                    {day.exercises.length} ejercicios
                  </Text>
                )}
              </View>

              {isCompleted && <Text style={styles.check}>✓</Text>}
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ───────── TAB ───────── */

function Tab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tab, active && styles.tabActive]}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

/* ───────── ESTILOS ───────── */

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingTop: 12,
  },

  /* Header */
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    color: "#9ca3af",
  },

  /* Tabs */
  tabs: {
    flexDirection: "row",
    marginVertical: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#7f1d1d",
  },
  tabText: {
    fontWeight: "600",
    color: "#9ca3af",
  },
  tabTextActive: {
    color: "#7f1d1d",
  },

  /* Cards */
  dayCard: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    alignItems: "center",
  },
  restCard: {
    opacity: 0.6,
  },
  indicator: {
    width: 6,
    height: "100%",
    borderRadius: 6,
    backgroundColor: "#f59e0b", // pendiente
    marginRight: 12,
  },
  completed: {
    backgroundColor: "#22c55e",
  },
  rest: {
    backgroundColor: "#9ca3af",
  },
  dayContent: {
    flex: 1,
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
  },
  dayTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginVertical: 4,
  },
  exerciseCount: {
    fontSize: 13,
    color: "#9ca3af",
  },
  restText: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#9ca3af",
  },
  check: {
    fontSize: 18,
    color: "#22c55e",
    marginLeft: 8,
  },
});
