export type WorkoutHistoryItem = {
  id: string;
  date: string; // ISO string
  title: string;
  completed: boolean;
  exercisesCompleted: number;
  totalExercises: number;
};

export const workoutHistory: WorkoutHistoryItem[] = [
  {
    id: "2024-01-15",
    date: "2024-01-15",
    title: "Piernas",
    completed: true,
    exercisesCompleted: 6,
    totalExercises: 6,
  },
  {
    id: "2024-01-14",
    date: "2024-01-14",
    title: "Espalda + Bíceps",
    completed: false,
    exercisesCompleted: 4,
    totalExercises: 6,
  },
  {
    id: "2024-01-13",
    date: "2024-01-13",
    title: "Pecho + Tríceps",
    completed: true,
    exercisesCompleted: 5,
    totalExercises: 5,
  },
];
