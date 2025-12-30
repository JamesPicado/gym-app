export type Exercise = {
  name: string;
  sets: number;
  reps: string;
};

export type Routine = {
  id: string;
  title: string;
  goal: string;
  duration: string;
  exercises: Exercise[];
};

export const routines: Routine[] = [
  {
    id: "1",
    title: "Pecho & Tríceps",
    goal: "Hipertrofia",
    duration: "45 min",
    exercises: [
      { name: "Press banca", sets: 4, reps: "8–10" },
      { name: "Aperturas", sets: 3, reps: "12" },
      { name: "Fondos", sets: 3, reps: "10" },
      { name: "Tríceps polea", sets: 3, reps: "12" },
    ],
  },
  {
    id: "2",
    title: "Espalda & Bíceps",
    goal: "Fuerza",
    duration: "50 min",
    exercises: [
      { name: "Dominadas", sets: 4, reps: "6–8" },
      { name: "Remo barra", sets: 4, reps: "8" },
      { name: "Curl bíceps", sets: 3, reps: "10–12" },
    ],
  },
];
