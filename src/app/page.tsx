'use client';

import { Activity, Apple, CalendarCheck, Camera, Check, ChevronRight, Dumbbell, Flame, Footprints, HeartPulse, Moon, Pizza, RotateCcw, Scale, ShieldCheck, Timer, Trophy } from 'lucide-react';
import { exercises, exerciseById } from '@/data/exercises';
import { damageControlTips, quickMeals, consistencyHeatmap, weeklyCompliance, weightTrend } from '@/data/mock';
import { programWeeks } from '@/data/program';
import { calculateCompliance, defaultState, getTargets, motivationalMessages } from '@/lib/fitness';
import { useLocalState } from '@/lib/useLocalState';
import { LineChart } from '@/components/LineChart';
import { MetricRing } from '@/components/MetricRing';
import { ProgressBar } from '@/components/ProgressBar';
import { Section } from '@/components/Section';
import type { AppState, Completion } from '@/types/fitness';

const currentWeek = programWeeks[3];
const today = currentWeek.days[0];
const nav = ['Dashboard', 'Workout', 'Nutrition', 'Check-in', 'Progress'];

export default function Home() {
  const [state, setState] = useLocalState<AppState>('consistency-fit-state', defaultState);
  const targets = getTargets(state.busyMode);
  const compliance = calculateCompliance(state.checkIn);
  const completedWorkoutItems = today.exercises.filter((item) => state.workoutCompletion[item.exerciseId] === 'complete').length;

  const updateCompletion = (exerciseId: string, completion: Completion) => {
    setState((previous) => ({
      ...previous,
      workoutCompletion: { ...previous.workoutCompletion, [exerciseId]: completion },
    }));
  };

  const addMeal = (meal: { calories: number; protein: number }) => {
    setState((previous) => ({ ...previous, calories: previous.calories + meal.calories, protein: previous.protein + meal.protein }));
  };

  return (
    <main className="ios-safe-shell mx-auto min-h-screen max-w-6xl px-4 sm:px-6 lg:px-8">
      <header className="sticky top-3 z-50 glass-card mb-6 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-ember shadow-glow"><Flame className="h-6 w-6" /></div>
          <div>
            <p className="text-lg font-black tracking-tight">Consistency Fit</p>
            <p className="text-xs text-zinc-400">Fat loss without the all-or-nothing spiral.</p>
          </div>
        </div>
        <button
          onClick={() => setState((previous) => ({ ...previous, busyMode: !previous.busyMode }))}
          className={`soft-button hidden sm:block ${state.busyMode ? 'bg-ember text-white' : 'bg-white/10 text-zinc-200'}`}
        >
          {state.busyMode ? 'Vacation Mode On' : 'Standard Mode'}
        </button>
      </header>

      <section id="dashboard" className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
        <div className="glass-card overflow-hidden p-6">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ember/15 px-3 py-1 text-xs font-bold text-red-200">Week {currentWeek.week} of 10 • {currentWeek.phase}</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-zinc-300">{currentWeek.equipment}</span>
            </div>
            <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">Progress that survives real life.</h1>
            <p className="mt-4 max-w-xl text-balance text-zinc-300">{motivationalMessages[1]} Track calories, protein, steps, workouts, and recovery with flexible guardrails—not guilt.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-black/30 p-4"><Trophy className="mb-3 text-ember" /><p className="text-3xl font-black">12</p><p className="text-sm text-zinc-400">day streak</p></div>
              <div className="rounded-3xl bg-black/30 p-4"><ShieldCheck className="mb-3 text-emerald-300" /><p className="text-3xl font-black">{compliance}%</p><p className="text-sm text-zinc-400">daily compliance</p></div>
              <div className="rounded-3xl bg-black/30 p-4"><CalendarCheck className="mb-3 text-sky-300" /><p className="text-3xl font-black">86%</p><p className="text-sm text-zinc-400">weekly average</p></div>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Today&apos;s workout</p>
              <h2 className="text-2xl font-black">{today.title}</h2>
            </div>
            <Dumbbell className="text-ember" />
          </div>
          <p className="mt-3 text-sm text-zinc-300">{today.focus}</p>
          <div className="mt-5 space-y-3">
            <ProgressBar label="Exercise progress" value={(completedWorkoutItems / today.exercises.length) * 100} />
            <ProgressBar label="Week compliance" value={86} tone="white" />
          </div>
          <a href="#workout" className="soft-button mt-5 flex items-center justify-center gap-2 bg-white text-black">Start Workout <ChevronRight className="h-4 w-4" /></a>
        </div>
      </section>

      <Section id="metrics" eyebrow="Dashboard" title="Today's simple targets">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricRing label="Calories" value={state.calories} target={targets.caloriesMax} unit="cal" />
          <MetricRing label="Protein" value={state.protein} target={targets.protein} unit="g" accent="#ffffff" />
          <MetricRing label="Steps" value={state.steps} target={targets.steps} unit="steps" accent="#f87171" />
          <MetricRing label="Water" value={state.water} target={targets.water} unit="oz" accent="#60a5fa" />
        </div>
        <div className="glass-card p-5">
          <div className="flex items-start gap-3"><Moon className="mt-1 text-ember" /><div><h3 className="font-black">Busy Week / Vacation Mode</h3><p className="text-sm text-zinc-400">When life gets full, the app protects the anchors: protein, walking, and minimum effective workouts. Momentum beats punishment.</p></div></div>
          <button onClick={() => setState((p) => ({ ...p, busyMode: !p.busyMode }))} className={`soft-button mt-4 w-full ${state.busyMode ? 'bg-ember text-white' : 'bg-white/10 text-white'}`}>{state.busyMode ? 'Reduced goals active' : 'Enable reduced goals'}</button>
        </div>
      </Section>

      <Section id="program" eyebrow="10-week plan" title="Structured progression without burnout">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {programWeeks.map((week) => (
            <div key={week.week} className={`rounded-3xl border p-4 ${week.week === currentWeek.week ? 'border-ember bg-ember/10' : 'border-white/10 bg-white/[0.04]'}`}>
              <p className="text-xs font-bold text-zinc-400">Week {week.week}</p>
              <h3 className="mt-1 font-black">{week.phase}</h3>
              <p className="mt-2 text-xs text-zinc-400">{week.equipment}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {currentWeek.days.map((day) => (
            <div key={day.day} className="glass-card p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-ember">{day.day}</p>
              <h3 className="mt-2 font-black">{day.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{day.conditioning}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="workout" eyebrow="Workout" title="Guided strength session">
        <div className="glass-card p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><h3 className="text-xl font-black">{today.title} • {today.duration}</h3><p className="text-sm text-zinc-400">Auto-rest, demo placeholders, swaps, and partial completion are built into the flow.</p></div>
            <div className="flex gap-2"><button className="soft-button bg-ember text-white">Start Workout</button><button className="soft-button bg-white text-black">Finish</button></div>
          </div>
          <div className="mt-5 space-y-3">
            {today.exercises.map((item, index) => {
              const exercise = exerciseById[item.exerciseId];
              const status = state.workoutCompletion[item.exerciseId] ?? 'planned';
              return (
                <article key={item.exerciseId} className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                  <div className="flex gap-4">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/10"><Activity className="text-ember" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3"><div><p className="text-xs text-zinc-500">Exercise {index + 1}</p><h4 className="font-black">{exercise.name}</h4></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize">{status}</span></div>
                      <p className="mt-2 text-sm text-zinc-400">{item.sets} sets • {item.reps} reps/hold • {item.restSeconds}s rest</p>
                      <p className="mt-2 text-sm text-zinc-300">{exercise.instructions}</p>
                      <div className="mt-3 flex flex-wrap gap-2">{exercise.muscles.map((muscle) => <span key={muscle} className="rounded-full bg-ember/10 px-2 py-1 text-xs text-red-100">{muscle}</span>)}</div>
                      <div className="mt-3 grid gap-2 text-xs text-zinc-400 sm:grid-cols-2"><p><b className="text-zinc-200">Modify:</b> {exercise.beginnerModification}</p><p><b className="text-zinc-200">Progress:</b> {exercise.harderProgression}</p></div>
                      <div className="mt-4 flex flex-wrap gap-2"><button onClick={() => updateCompletion(item.exerciseId, 'complete')} className="soft-button bg-emerald-400 text-black"><Check className="inline h-4 w-4" /> Done</button><button onClick={() => updateCompletion(item.exerciseId, 'partial')} className="soft-button bg-white/10">Partial</button><button onClick={() => updateCompletion(item.exerciseId, 'swapped')} className="soft-button bg-white/10"><RotateCcw className="inline h-4 w-4" /> Swap</button><button className="soft-button bg-white/10"><Timer className="inline h-4 w-4" /> Rest {item.restSeconds}s</button></div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      <Section id="nutrition" eyebrow="Nutrition" title="Simple calories, protein, and water">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card p-5"><div className="flex items-center gap-3"><Apple className="text-ember" /><div><h3 className="font-black">Quick-add favorites</h3><p className="text-sm text-zinc-400">No macro spreadsheet. Just log the big rocks quickly.</p></div></div><div className="mt-4 grid gap-2">{quickMeals.map((meal) => <button key={meal.name} onClick={() => addMeal(meal)} className="flex items-center justify-between rounded-2xl bg-white/10 p-3 text-left transition hover:bg-white/15"><span>{meal.name}</span><span className="text-sm text-zinc-400">{meal.calories} cal • {meal.protein}g</span></button>)}</div></div>
          <div className="glass-card p-5"><div className="flex items-center gap-3"><Pizza className="text-ember" /><div><h3 className="font-black">Damage Control Mode</h3><p className="text-sm text-zinc-400">Pizza Hut, vacation, birthdays, and stressful weeks fit inside the plan.</p></div></div><div className="mt-4 space-y-2">{damageControlTips.map((tip) => <p key={tip} className="rounded-2xl bg-black/25 p-3 text-sm text-zinc-300">{tip}</p>)}</div></div>
        </div>
      </Section>

      <Section id="check-in" eyebrow="Accountability" title="Reward consistency, partial wins, and recovery">
        <div className="glass-card p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[['protein', 'Hit protein'], ['calories', 'Near calories'], ['steps', '10k steps']].map(([key, label]) => (
              <button key={key} onClick={() => setState((p) => ({ ...p, checkIn: { ...p.checkIn, [key]: !p.checkIn[key as 'protein'] } }))} className={`rounded-3xl p-4 text-left transition ${state.checkIn[key as 'protein'] ? 'bg-ember text-white' : 'bg-white/10 text-zinc-300'}`}><Check className="mb-4" /><b>{label}</b><p className="mt-1 text-xs opacity-80">Yes counts. Almost still teaches.</p></button>
            ))}
            <div className="rounded-3xl bg-white/10 p-4"><HeartPulse className="mb-4 text-ember" /><b>Energy</b><input type="range" min="1" max="5" value={state.checkIn.energy} onChange={(e) => setState((p) => ({ ...p, checkIn: { ...p.checkIn, energy: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 } }))} className="mt-3 w-full accent-red-500" /><p className="text-xs text-zinc-400">Low energy increases recovery credit.</p></div>
          </div>
          <div className="mt-5"><ProgressBar label="Daily compliance score" value={compliance} /></div>
          <div className="mt-5 grid grid-cols-7 gap-2">{consistencyHeatmap.map((value, index) => <div key={index} className="aspect-square rounded-lg" style={{ backgroundColor: `rgba(255,48,79,${0.12 + value * 0.7})` }} aria-label={`Habit score ${Math.round(value * 100)}%`} />)}</div>
        </div>
      </Section>

      <Section id="progress" eyebrow="Progress" title="Trends over single weigh-ins">
        <div className="grid gap-4 lg:grid-cols-[1fr_.8fr]">
          <LineChart values={weightTrend} label="Weight trend" />
          <div className="glass-card p-5"><h3 className="font-black">Body metric dashboard</h3><div className="mt-4 grid grid-cols-2 gap-3">{[{ icon: Scale, label: 'Waist', value: '40.5 in' }, { icon: Camera, label: 'Photos', value: '4 sets' }, { icon: Dumbbell, label: 'Pushup max', value: '24 reps' }, { icon: Footprints, label: 'Walk distance', value: '18.6 mi' }].map(({ icon: Icon, label, value }) => <div key={label} className="rounded-3xl bg-black/25 p-4"><Icon className="mb-3 text-ember" /><p className="text-xl font-black">{value}</p><p className="text-sm text-zinc-400">{label}</p></div>)}</div><div className="mt-5 space-y-3">{weeklyCompliance.map((score, index) => <ProgressBar key={index} label={`Week ${index + 1}`} value={score} tone={index % 2 ? 'white' : 'red'} />)}</div></div>
        </div>
      </Section>

      <Section id="library" eyebrow="Exercise library" title="Clear demos, modifications, and progression paths">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {exercises.map((exercise) => <article key={exercise.id} className="glass-card p-4"><div className="mb-3 flex items-center justify-between"><h3 className="font-black">{exercise.name}</h3><span className="rounded-full bg-white/10 px-2 py-1 text-xs">{exercise.difficulty}</span></div><p className="text-sm text-zinc-400">{exercise.instructions}</p><p className="mt-3 text-xs text-zinc-500">Path: {exercise.progressionPath.join(' → ')}</p></article>)}
        </div>
      </Section>

      <nav className="ios-tabbar fixed left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 justify-between rounded-full border border-white/10 bg-black/80 p-2 shadow-card backdrop-blur-xl">
        {nav.map((item) => <a key={item} href={`#${item.toLowerCase().replace('dashboard', 'dashboard').replace('check-in', 'check-in')}`} className="rounded-full px-3 py-2 text-xs font-bold text-zinc-300 hover:bg-white/10">{item}</a>)}
      </nav>
    </main>
  );
}
