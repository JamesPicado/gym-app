export type WeightEntry = {
  date: string;
  weight: number;
};

export type WorkoutExercise = {
  id: string;
  name: string;
  videoUrl?: string; 
  restTime: number;
  weight?: number;
  history?: WeightEntry[];
  completed?: boolean;
  coachNotes?: string; 
};

export type UserWorkoutDay = {
  /**
   * Fecha en formato ISO YYYY-MM-DD para poder filtrar por pasado/próximo.
   */
  date: string;
  title: string;
  status: "pending" | "completed" | "missed" | "rest";
  exercises: WorkoutExercise[];
};

export const userWorkouts: UserWorkoutDay[] = [
  {
    date: "2025-12-29",
    title: "PIERNAS",
    status: "pending",
    exercises: [
      {
        id: "hack-squat",
        name: "Hack Squat",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        coachNotes: "Baja controlado 3 segundos, no bloquees rodillas. Última serie al fallo.",
        restTime: 90,
        history: [
          { date: "2024-12-01", weight: 60 },
          { date: "2024-12-15", weight: 70 },
        ],
      },
    ],
  },
  {
    date: "2025-12-25",
    title: "Brazo",
    status: "pending",
    exercises: [
      {
        id: "CurlMartillo",
        name: "Curl Martillo",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        coachNotes: "Baja controlado 3 segundos, no bloquees rodillas. Última serie al fallo.",
        restTime: 90,
        history: [
          { date: "2024-12-01", weight: 60 },
          { date: "2024-12-15", weight: 70 },
        ],
      },
    ],
  },
  {
    date: "2024-12-20",
    title: "Espalda + Bíceps",
    status: "completed",
    exercises: [
      {
        id: "dominadas",
        name: "Dominadas con lastre",
        restTime: 120,
        weight: 15,
        completed: true,
        history: [
          { date: "2024-12-01", weight: 10 },
          { date: "2024-12-10", weight: 12.5 },
        ],
      },
      {
        id: "remo",
        name: "Remo con barra",
        restTime: 90,
        weight: 50,
        completed: true,
      },
    ],
  },
  {
    date: "2024-12-18",
    title: "Día de descanso",
    status: "rest",
    exercises: [],
  },
];
