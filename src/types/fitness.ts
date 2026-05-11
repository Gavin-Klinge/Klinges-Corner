export type DayType = 'workout' | 'conditioning' | 'recovery';
export type Completion = 'planned' | 'partial' | 'complete' | 'swapped';

export type Exercise = {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions: string;
  muscles: string[];
  beginnerModification: string;
  harderProgression: string;
  progressionPath: string[];
};

export type WorkoutExercise = {
  exerciseId: string;
  sets: number;
  reps: string;
  restSeconds: number;
};

export type ProgramDay = {
  day: string;
  type: DayType;
  title: string;
  focus: string;
  duration: string;
  exercises: WorkoutExercise[];
  conditioning: string;
  plank: string;
};

export type ProgramWeek = {
  week: number;
  phase: 'Foundation' | 'Volume' | 'Intensity' | 'Performance';
  headline: string;
  equipment: string;
  days: ProgramDay[];
};

export type DailyCheckIn = {
  protein: boolean;
  calories: boolean;
  steps: boolean;
  workout: 'none' | 'partial' | 'complete';
  energy: 1 | 2 | 3 | 4 | 5;
};

export type AppState = {
  busyMode: boolean;
  calories: number;
  protein: number;
  water: number;
  steps: number;
  workoutCompletion: Record<string, Completion>;
  checkIn: DailyCheckIn;
};
