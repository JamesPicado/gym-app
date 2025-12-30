import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

import { type WorkoutExercise, userWorkouts } from "@/src/data/userWorkouts";
import { useTheme } from "@/src/theme/useTheme";



/* ───────── ANDROID ANIMATION ENABLE ───────── */
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function RoutineDayScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();

  const day = userWorkouts[Number(id)];
  const [exercises, setExercises] = useState<WorkoutExercise[]>(
    day?.exercises ?? []
  );
  const [restTimers, setRestTimers] = useState<Record<number, number>>({});
  const [runningTimer, setRunningTimer] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
  const initialCollapsed: Record<string, boolean> = {};

  exercises.forEach((ex) => {
    if (ex.completed) {
      initialCollapsed[ex.id] = true;
    }
  });

    setCollapsed(initialCollapsed);
  }, []);


  if (!day) return null;

  /* ───────── A) PROGRESO GLOBAL ───────── */

  const totalExercises = exercises.length;

  const completedExercises = useMemo(
    () => exercises.filter(e => e.completed).length,
    [exercises]
  );

  const routineCompleted =
    totalExercises > 0 && completedExercises === totalExercises;

  const progressPercent =
    totalExercises === 0
      ? 0
      : Math.round((completedExercises / totalExercises) * 100);

  /* ───────── C) ÚLTIMO PESO VS ACTUAL ───────── */

  const getLastWeight = (ex: any) => {
    if (!ex.history || ex.history.length === 0) return null;
    return ex.history[ex.history.length - 1].weight;
  };

  /* ───────── B) RESUMEN DE SESIÓN ───────── */

  const totalWeightMoved = useMemo(() => {
    return exercises.reduce((sum, ex) => {
      return sum + (ex.weight ? ex.weight * 30 : 0);
    }, 0);
  }, [exercises]);

  const estimatedTime = totalExercises * 10 + totalExercises * 3;

  /* ───────── LÓGICA EXISTENTE ───────── */

  const updateWeight = (index: number, value: string) => {
    const copy = [...exercises];
    copy[index].weight = Number(value);
    setExercises(copy);
  };

  const toggleExerciseCompleted = (index: number) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    const today = new Date().toISOString().slice(0, 10);
    const copy = [...exercises];
    const ex = copy[index];

    if (!ex.completed && ex.weight) {
      ex.history = [
        ...(ex.history ?? []),
        { date: today, weight: ex.weight },
      ];
    }

    ex.completed = !ex.completed;

    setCollapsed(prev => ({
      ...prev,
      [ex.id]: !!ex.completed,
    }));

    setExercises(copy);
  };

  const startRestTimer = (index: number, seconds: number) => {
    if (runningTimer !== null) return;

    setRunningTimer(index);
    setRestTimers(prev => ({ ...prev, [index]: seconds }));

    const interval = setInterval(() => {
      setRestTimers(prev => {
        const current = prev[index];
        if (current <= 1) {
          clearInterval(interval);
          setRunningTimer(null);
          return { ...prev, [index]: 0 };
        }
        return { ...prev, [index]: current - 1 };
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* ───────── HEADER GLOBAL ───────── */}
        <Text style={[styles.date, { color: colors.muted }]}>
          {day.date}
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>
          {day.title}
        </Text>

        <Text
          style={[
            styles.statusText,
            {
              color: routineCompleted
                ? colors.primary
                : colors.muted,
            },
          ]}
        >
          {routineCompleted
            ? "Rutina completada ✅"
            : `En progreso · ${completedExercises} / ${totalExercises} ejercicios`}
        </Text>

        <View
          style={[
            styles.progressBarBackground,
            { backgroundColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progressPercent}%`,
                backgroundColor: colors.primary,
              },
            ]}
          />
        </View>

        {/* ───────── EJERCICIOS ───────── */}
        {exercises.map((ex, index) => {
          const lastWeight = getLastWeight(ex);
          const diff =
            lastWeight && ex.weight
              ? ex.weight - lastWeight
              : null;

          return (
            <View
              key={ex.id}
              style={[
                styles.card,
                {
                backgroundColor: ex.completed
                ? colors.successBackground
                : colors.cardSecondary,
                borderColor: ex.completed
                ? colors.successBorder
                : colors.border,
                borderWidth: 1,
                opacity: ex.completed ? 0.9 : 1,
    },
              ]}
            >
              {/* HEADER */}
              <View style={styles.exerciseHeader}>
                <Text
                  style={[
                    styles.name,
                    { color: colors.text },
                    ex.completed && styles.completedText,
                  ]}
                >
                  {String.fromCharCode(65 + index)} · {ex.name}
                </Text>

                <Pressable
                  onPress={() => toggleExerciseCompleted(index)}
                >
                  <Ionicons
                    name={
                      ex.completed
                        ? "checkmark-circle"
                        : "ellipse-outline"
                    }
                    size={26}
                    color={
                      ex.completed
                        ? colors.primary
                        : colors.muted
                    }
                  />
                </Pressable>
              </View>

              {/* ───── CONTENIDO COLAPSABLE ───── */}
              {!collapsed[ex.id] && (
                <>
                  {/* VIDEO */}
                  {ex.videoUrl && (
                    <View style={styles.videoBox}>
                      <Video
                        source={{ uri: ex.videoUrl }}
                        style={styles.video}
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                      />
                    </View>
                  )}

                  {/* NOTAS COACH */}
                  {ex.coachNotes && (
                    <View
                      style={[
                        styles.coachBox,
                        { backgroundColor: colors.surface },
                      ]}
                    >
                      <Text
                        style={[
                          styles.coachTitle,
                          { color: colors.text },
                        ]}
                      >
                        🧠 Indicaciones del coach
                      </Text>
                      <Text
                        style={[
                          styles.coachText,
                          { color: colors.muted },
                        ]}
                      >
                        {ex.coachNotes}
                      </Text>
                    </View>
                  )}

                  {/* PESO */}
                  <Text
                    style={[
                      styles.label,
                      { color: colors.muted },
                    ]}
                  >
                    Peso usado (kg)
                  </Text>

                  <View
                    style={[
                      styles.weightInputWrapper,
                      { borderColor: colors.border },
                    ]}
                  >
                    <TextInput
                      value={ex.weight?.toString() ?? ""}
                      onChangeText={v =>
                        updateWeight(index, v)
                      }
                      keyboardType="number-pad"
                      placeholder="0"
                      placeholderTextColor={colors.muted}
                      style={[
                        styles.weightInput,
                        { color: colors.text },
                      ]}
                    />
                    <Text
                      style={[
                        styles.kg,
                        { color: colors.muted },
                      ]}
                    >
                      kg
                    </Text>
                  </View>

                  {lastWeight !== null && (
                    <Text
                      style={[
                        styles.lastWeight,
                        {
                          color:
                            diff && diff > 0
                              ? "#16A34A"
                              : colors.muted,
                        },
                      ]}
                    >
                      Última vez: {lastWeight} kg
                      {diff && diff > 0 && `  ↑ +${diff} kg`}
                    </Text>
                  )}

                  {/* DESCANSO */}
                  <Pressable
                    style={[
                      styles.actionButton,
                      { backgroundColor: colors.surface },
                    ]}
                    onPress={() =>
                      startRestTimer(index, ex.restTime)
                    }
                  >
                    <Text
                      style={[
                        styles.actionText,
                        { color: colors.text },
                      ]}
                    >
                      {restTimers[index] &&
                      restTimers[index] > 0
                        ? `Descansando · ${restTimers[index]}s`
                        : `Iniciar descanso · ${ex.restTime}s`}
                    </Text>
                  </Pressable>

                  {/* 🔥 BOTÓN PROGRESIÓN RESTAURADO */}
                  <Pressable
                    style={[
                      styles.progressButton,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={() =>
                      router.push(`/progression/${ex.id}`)
                    }
                  >
                    <Text
                      style={[
                        styles.progressText,
                        { color: colors.background },
                      ]}
                    >
                      Ver progresión
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          );
        })}

        {/* ───────── RESUMEN DE SESIÓN ───────── */}
        {routineCompleted && (
          <View
            style={[
              styles.summaryBox,
              { backgroundColor: colors.surface },
            ]}
          >
            <Text
              style={[
                styles.summaryTitle,
                { color: colors.text },
              ]}
            >
              🎉 Rutina completada
            </Text>

            <Text
              style={[
                styles.summaryItem,
                { color: colors.text },
              ]}
            >
              ✔ {completedExercises} ejercicios completados
            </Text>

            <Text
              style={[
                styles.summaryItem,
                { color: colors.text },
              ]}
            >
              ⏱ {estimatedTime} min aprox.
            </Text>

            <Text
              style={[
                styles.summaryItem,
                { color: colors.text },
              ]}
            >
              🏋️ {totalWeightMoved.toLocaleString()} kg movidos
            </Text>

            <Pressable
              style={[
                styles.finishButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={() => router.replace("/(tabs)/routines")}
            >
              <Text
                style={[
                  styles.finishText,
                  { color: colors.background },
                ]}
              >
                Volver a entrenamientos
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ───────── ESTILOS ───────── */

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 60 },

  date: { fontSize: 14 },
  title: { fontSize: 26, fontWeight: "700" },

  statusText: { fontSize: 14, marginBottom: 8 },

  progressBarBackground: {
    height: 8,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 6,
  },

  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  name: { fontSize: 18, fontWeight: "700" },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },

  videoBox: {
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#000",
  },
  video: { width: "100%", height: "100%" },

  coachBox: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  coachTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  coachText: {
    fontSize: 14,
    lineHeight: 20,
  },

  label: { fontSize: 13, marginBottom: 6 },

  weightInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  weightInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 12,
    textAlign: "center",
  },
  kg: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 4,
  },

  lastWeight: {
    fontSize: 13,
    marginBottom: 10,
  },

  actionButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 6,
  },
  actionText: {
    fontWeight: "600",
    fontSize: 14,
  },

  progressButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  progressText: {
    fontWeight: "600",
    fontSize: 14,
  },

  summaryBox: {
    padding: 20,
    borderRadius: 18,
    marginTop: 24,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },
  summaryItem: {
    fontSize: 15,
    marginBottom: 6,
  },

  finishButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  finishText: {
    fontWeight: "700",
    fontSize: 15,
  },
});
