import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../../src/theme/useTheme";
import { ProgressRing } from "../../src/components/ProgressRing";
import { ProgressCard } from "../../src/components/ProgressCard";
import { InsightCard } from "../../src/components/InsightCard";
import { MuscleStatsCard } from "../../src/components/MuscleStatsCard";

export default function ProgressScreen() {
  const { colors } = useTheme();

  // Mock (backend-ready)
  const completed = 8;
  const goal = 12;
  const streak = 5;
  const minutes = 340;
  const muscleStats = [
  { muscle: "Piernas", sessions: 8, percentage: 32 },
  { muscle: "Espalda", sessions: 6, percentage: 24 },
  { muscle: "Pecho", sessions: 5, percentage: 20 },
  { muscle: "Hombros", sessions: 3, percentage: 12 },
  { muscle: "Bíceps", sessions: 2, percentage: 8 },
  { muscle: "Tríceps", sessions: 1, percentage: 4 },
];

  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* HEADER */}
        <Text style={[styles.title, { color: colors.text }]}>
          Progreso
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Tu evolución
        </Text>

        {/* PROGRESO PRINCIPAL (FULL WIDTH) */}
        <ProgressCard>
          <Text style={[styles.cardTitle, { color: colors.muted }]}>
            Progreso mensual
          </Text>

          <View style={styles.ringWrapper}>
            <ProgressRing value={completed} max={goal} />
          </View>

          <Text style={[styles.cardMain, { color: colors.text }]}>
            {completed} / {goal} completadas
          </Text>
        </ProgressCard>

        {/* GRID DE CARDS (2 POR FILA) */}
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <ProgressCard>
              <Text style={[styles.cardTitle, { color: colors.muted }]}>
                Estado actual
              </Text>
              <Text style={[styles.cardMain, { color: colors.text }]}>
                Faltan {goal - completed}
              </Text>
              <Text style={[styles.cardSub, { color: "#4ade80" }]}>
                +2 vs mes anterior
              </Text>
            </ProgressCard>
          </View>

          <View style={styles.gridItem}>
            <ProgressCard>
              <Text style={[styles.cardTitle, { color: colors.muted }]}>
                Mejor ejercicio
              </Text>
              <Text style={[styles.cardMain, { color: colors.text }]}>
                Hack Squat
              </Text>
              <Text style={[styles.cardSub, { color: "#4ade80" }]}>
                +15 kg
              </Text>
            </ProgressCard>
          </View>

          <View style={styles.gridItem}>
            <ProgressCard>
              <Text style={[styles.cardTitle, { color: colors.muted }]}>
                Último logro
              </Text>
              <Text style={[styles.cardMain, { color: colors.text }]}>
                5 días seguidos
              </Text>
            </ProgressCard>
          </View>
        </View>

        {/* KPIs EN FILA */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiItem}>
            <ProgressCard>
              <Text style={[styles.kpiValue, { color: "#4ade80" }]}>
                {goal}
              </Text>
              <Text style={styles.kpiLabel}>Sesiones</Text>
            </ProgressCard>
          </View>

          <View style={styles.kpiItem}>
            <ProgressCard>
              <Text style={[styles.kpiValue, { color: "#fb923c" }]}>
                {streak}
              </Text>
              <Text style={styles.kpiLabel}>Racha</Text>
            </ProgressCard>
          </View>

          <View style={styles.kpiItem}>
            <ProgressCard>
              <Text style={[styles.kpiValue, { color: "#60a5fa" }]}>
                {minutes}
              </Text>
              <Text style={styles.kpiLabel}>Minutos</Text>
            </ProgressCard>
          </View>
        </View>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
  Insights
</Text>

<InsightCard
  icon="trending-up-outline"
  title="Vas mejorando"
  description="Entrenaste 18% más que el mes pasado"
  accent="#4ade80"
/>

<InsightCard
  icon="barbell-outline"
  title="Ejercicio más constante"
  description="Hack Squat fue tu ejercicio más repetido"
  accent="#60a5fa"
/>

<InsightCard
  icon="trophy-outline"
  title="Mejor semana"
  description="Del 12 al 18 de diciembre · 4 sesiones"
  accent="#fb923c"
/>

<InsightCard
  icon="alert-circle-outline"
  title="Ritmo bajo esta semana"
  description="Entrenaste menos que tu promedio habitual"
  accent="#f87171"
/>
<MuscleStatsCard data={muscleStats} />
      </ScrollView>
      
      {/* ───────── INSIGHTS ───────── */}

    </SafeAreaView>
    
  );
  
}

/* ───────── ESTILOS ───────── */

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 16,
  },

  ringWrapper: {
    alignItems: "center",
    marginVertical: 12,
  },

  cardTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  cardMain: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardSub: {
    fontSize: 14,
    marginTop: 4,
  },

  /* GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  gridItem: {
    width: "48%",
  },

  /* KPIs */
  kpiRow: {
    flexDirection: "row",
    gap: 12,
  },
  kpiItem: {
    flex: 1,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: "800",
  },
  kpiLabel: {
    fontSize: 12,
    color: "#9ca3af",
  },
  sectionTitle: {
  fontSize: 18,
  fontWeight: "800",
  marginVertical: 12,
},

});
