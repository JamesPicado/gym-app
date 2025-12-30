import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/theme/useTheme";

// Cards existentes
import { HomeRoutineCard } from "../../src/components/HomeRoutineCard";
import { HomeProgressCard } from "../../src/components/HomeProgressCard";
import { HomeActivityCard } from "../../src/components/HomeActivityCard";

// Acciones rápidas
import { HomeQuickActions } from "../../src/components/HomeQuickActions";

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* ───────── HEADER ───────── */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>
              Hola, James 💪
            </Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString("es-CR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </Text>
          </View>

          <View style={styles.streak}>
            <Text style={styles.streakValue}>🔥 5</Text>
            <Text style={styles.streakLabel}>días seguidos</Text>
          </View>
        </View>

        {/* ───────── STATS COMPACTOS ───────── */}
        <View style={styles.statsRow}>
          <Stat label="Sesiones" value="12" color={colors.text} />
          <Stat label="Minutos" value="340" color={colors.text} />
          <Stat label="Calorías" value="2.1k" color={colors.text} />
        </View>

        {/* ───────── RUTINA DE HOY ───────── */}
        <HomeRoutineCard />

        {/* ───────── ACCIONES RÁPIDAS ───────── */}
        <HomeQuickActions />

        {/* ───────── PROGRESO ───────── */}
        <HomeProgressCard />

        {/* ───────── ACTIVIDAD RECIENTE ───────── */}
        <HomeActivityCard />

        <View style={[styles.activityList, { backgroundColor: colors.card }]}>
          <Text style={[styles.activityItem, { color: colors.text }]}>
            ✔ Rutina Piernas completada
          </Text>
          <Text style={[styles.activityItem, { color: colors.text }]}>
            ✔ Peso registrado
          </Text>
          <Text style={[styles.activityItem, { color: colors.text }]}>
            ✔ Nuevo récord en press
          </Text>
        </View>

        {/* ───────── HISTORIAL ───────── */}
        <View style={styles.historyWrapper}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Historial
          </Text>

          <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>
            Revisa tus entrenamientos anteriores
          </Text>

          <View style={[styles.historyCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.historyText, { color: colors.text }]}>
              📅 Ver historial de entrenamientos
            </Text>

            <Text
              style={[
                styles.historyDescription,
                { color: colors.muted },
              ]}
            >
              Consulta tus rutinas completadas y tu progreso por fecha.
            </Text>

            <View style={styles.historyButtonRow}>
              <Text
                style={[
                  styles.historyButton,
                  { color: colors.primary },
                ]}
                onPress={() => router.push("/history")}
              >
                Ver historial →
              </Text>
            </View>
          </View>
        </View>

        {/* ───────── MOTIVACIÓN ───────── */}
        <View style={[styles.motivation, { backgroundColor: colors.card }]}>
          <Text style={[styles.motivationText, { color: colors.text }]}>
            “La constancia vence a la motivación.”
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ───────────────── COMPONENTE STAT ───────────────── */

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

/* ───────────────── ESTILOS ───────────────── */

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },

  /* Header */
  header: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
  },
  date: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 4,
  },
  streak: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  streakValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  streakLabel: {
    fontSize: 13,
    color: "#9ca3af",
  },

  /* Stats */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
    color: "#9ca3af",
  },

  /* Actividad */
  activityList: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  activityItem: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "500",
  },

  /* Historial */
  historyWrapper: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    marginBottom: 10,
  },
  historyCard: {
    borderRadius: 14,
    padding: 16,
  },
  historyText: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  historyDescription: {
    fontSize: 13,
    marginBottom: 12,
  },
  historyButtonRow: {
    alignItems: "flex-end",
  },
  historyButton: {
    fontSize: 14,
    fontWeight: "700",
  },

  /* Motivación */
  motivation: {
    borderRadius: 14,
    padding: 16,
  },
  motivationText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    opacity: 0.85,
  },
});
