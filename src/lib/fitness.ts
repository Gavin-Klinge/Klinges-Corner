import type { AppState, DailyCheckIn } from '@/types/fitness';

export const defaultState: AppState = {
  busyMode: false,
  calories: 1680,
  protein: 142,
  water: 72,
  steps: 8200,
  workoutCompletion: {},
  checkIn: {
    protein: true,
    calories: true,
    steps: false,
    workout: 'partial',
    energy: 3,
  },
};

export const standardTargets = {
  caloriesMin: 1900,
  caloriesMax: 2200,
  protein: 180,
  steps: 10000,
  water: 100,
  workouts: 3,
};

export const busyTargets = {
  caloriesMin: 1900,
  caloriesMax: 2400,
  protein: 150,
  steps: 7000,
  water: 80,
  workouts: 2,
};

export const getTargets = (busyMode: boolean) => (busyMode ? busyTargets : standardTargets);

export const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

export function calculateCompliance(checkIn: DailyCheckIn) {
  const protein = checkIn.protein ? 25 : 8;
  const calories = checkIn.calories ? 25 : 10;
  const steps = checkIn.steps ? 20 : 8;
  const workout = checkIn.workout === 'complete' ? 20 : checkIn.workout === 'partial' ? 14 : 6;
  const energyRecovery = checkIn.energy <= 2 ? 10 : 8;
  return clamp(protein + calories + steps + workout + energyRecovery);
}

export const motivationalMessages = [
  'Small wins compound.',
  'Progress survives imperfect days.',
  'Consistency beats intensity.',
  'Win the next meal. Win the next walk.',
  'The plan flexes so you can keep going.',
];
