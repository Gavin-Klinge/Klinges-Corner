import type { ProgramDay, ProgramWeek } from '@/types/fitness';

const phases: ProgramWeek['phase'][] = ['Foundation', 'Foundation', 'Volume', 'Volume', 'Volume', 'Intensity', 'Intensity', 'Intensity', 'Performance', 'Performance'];

const makeStrengthDay = (week: number, day: string, title: string, variant: 0 | 1 | 2): ProgramDay => {
  const bodyweight = week === 1;
  const sets = week < 3 ? 3 : week < 7 ? 4 : 5;
  const repBase = week < 4 ? '8-10' : week < 8 ? '10-12' : '12-15';
  const plankSeconds = 25 + week * 5;
  const templates = [
    bodyweight
      ? ['pushups', 'split-squats', 'band-rows', 'planks']
      : ['goblet-squats', 'pushups', 'band-rows', 'kb-rdls', 'planks'],
    bodyweight
      ? ['incline-pushups', 'lunges', 'pullup-progression', 'planks']
      : ['kb-presses', 'split-squats', 'pullup-progression', 'kettlebell-swings', 'planks'],
    bodyweight
      ? ['pushups', 'lunges', 'planks', 'band-rows']
      : ['kettlebell-swings', 'goblet-squats', 'backpack-pushups', 'hanging-raises', 'band-rows'],
  ];

  return {
    day,
    type: 'workout',
    title,
    focus: bodyweight ? 'Bodyweight control + clean movement' : 'Kettlebell strength + band pulling balance',
    duration: `${32 + week * 2} min`,
    exercises: templates[variant].map((exerciseId, index) => ({
      exerciseId,
      sets: index === templates[variant].length - 1 ? Math.max(2, sets - 1) : sets,
      reps: exerciseId === 'planks' ? `${plankSeconds}s` : repBase,
      restSeconds: week < 5 ? 60 : week < 8 ? 50 : 45,
    })),
    conditioning: 'Optional 8-minute easy walk cooldown.',
    plank: `${plankSeconds}s target holds`,
  };
};

const makeConditioningDay = (week: number, day: string): ProgramDay => ({
  day,
  type: 'conditioning',
  title: week < 5 ? 'Zone 2 Walk Intervals' : week < 8 ? 'Walk + Light Jog Builder' : 'Performance Conditioning',
  focus: 'Low-impact fat-loss conditioning that should leave you better, not crushed.',
  duration: `${25 + week * 3} min`,
  exercises: [],
  conditioning: week < 5
    ? `${25 + week * 3} minutes brisk walking with ${week + 3} short hill or pace pickups.`
    : `${20 + week * 2} minutes walking plus ${week - 3} x 60-second relaxed jogs.` ,
  plank: `${20 + week * 5}s relaxed core finisher if energy is good`,
});

const makeRecoveryDay = (week: number, day: string): ProgramDay => ({
  day,
  type: 'recovery',
  title: 'Recovery + Steps Anchor',
  focus: 'Protect momentum with mobility, protein, hydration, and an easy walk.',
  duration: '15-30 min',
  exercises: [],
  conditioning: `${6000 + week * 400} step minimum, mobility, and no guilt if life is busy.`,
  plank: 'Optional breathing drill or dead bug practice',
});

export const programWeeks: ProgramWeek[] = Array.from({ length: 10 }, (_, index) => {
  const week = index + 1;
  return {
    week,
    phase: phases[index],
    headline: week === 1
      ? 'Learn the patterns and build confidence.'
      : week < 6
        ? 'Add volume gradually while keeping joints fresh.'
        : week < 9
          ? 'Increase density and conditioning in controlled doses.'
          : 'Perform, polish, and finish strong without burnout.',
    equipment: week === 1 ? 'Bodyweight only' : 'Kettlebell + resistance bands',
    days: [
      makeStrengthDay(week, 'Monday', 'Strength A', 0),
      makeConditioningDay(week, 'Tuesday'),
      makeStrengthDay(week, 'Wednesday', 'Strength B', 1),
      makeRecoveryDay(week, 'Thursday'),
      makeStrengthDay(week, 'Friday', 'Strength C', 2),
      makeConditioningDay(week, 'Saturday'),
      makeRecoveryDay(week, 'Sunday'),
    ],
  };
});
