# Consistency Fit

A modern, mobile-first fitness accountability starter app focused on sustainable fat loss, habit consistency, and realistic lifestyle adherence. The product direction intentionally rewards partial completion, recovery, and momentum instead of perfection or shame-based fitness culture.

## Tech stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- PWA manifest starter with iOS standalone metadata
- Capacitor configuration for opening the exported web app in Xcode
- Local storage state for MVP persistence
- Componentized UI and data modules for future backend migration

## Project structure

```text
src/
  app/                 Next.js app shell, layout, global styles, and main page
  components/          Reusable UI primitives: progress rings, bars, charts, sections
  data/                Mock data, exercise library, and 10-week program generator
  lib/                 Fitness calculations, targets, local-storage hook
  types/               Shared TypeScript domain types
public/
  manifest.webmanifest PWA metadata starter
  icon.svg             App icon source for PWA/Capacitor asset generation
capacitor.config.ts    iOS wrapper configuration; exports Next static output from out/
```

## MVP feature coverage

- Dashboard with calories, protein, steps, water, streak, compliance, weekly phase, and weight trend
- 10-week program system with bodyweight week 1 and kettlebell/band progression for weeks 2-10
- Workout experience with exercise completion, partial completion, swaps, rest timers, demo placeholders, muscles worked, modifications, and progressions
- Simple nutrition tracking with quick-add foods, protein-first logging, and Damage Control Mode for social meals and vacations
- Daily accountability check-in, compliance score, weekly scorecards, streak psychology, and habit heatmap
- Progress tracking for weight, waist, progress photos, pushup max, walking distance, and workout completion
- Busy Week / Vacation Mode that reduces goals to sustainable anchors
- Exercise library with instructions, difficulty, progression path, and muscles worked

## Run locally in a browser

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build as an iOS-friendly app in Xcode

This project is still a web-first MVP, but it is configured to export static Next.js files and wrap them with Capacitor so you can open the app in Xcode and run it on an iPhone simulator or device.

### 1. Prerequisites

Install these on macOS:

- Xcode from the Mac App Store
- Xcode command-line tools: `xcode-select --install`
- Node.js 20 LTS or newer
- CocoaPods if your local Capacitor install requires it: `sudo gem install cocoapods`

### 2. Install JavaScript dependencies

```bash
npm install
```

### 3. Create the iOS project

Run this once after dependencies are installed:

```bash
npm run ios:init
```

That command builds the static Next.js export into `out/` and creates an `ios/` folder using `capacitor.config.ts`.

### 4. Open in Xcode

```bash
npm run ios:open
```

In Xcode:

1. Select the `App` project target.
2. Choose a signing team under **Signing & Capabilities** if you want to run on a physical iPhone.
3. Pick an iPhone simulator or connected device.
4. Press **Run**.

### 5. Sync future web changes into Xcode

Whenever you update the React/Next app, run:

```bash
npm run ios:sync
```

Then reopen or rerun the project in Xcode. Capacitor copies the latest `out/` build into the native iOS shell.

### 6. iOS polish notes

- The app uses `viewport-fit=cover`, standalone Apple web-app metadata, safe-area padding, and a safe-area-aware bottom tab bar for notched iPhones.
- The included SVG icon is a starter source. Before App Store distribution, generate full iOS PNG icon and splash assets and add them to `ios/App/App/Assets.xcassets`.
- For TestFlight/App Store builds, update `appId` in `capacitor.config.ts` to match your Apple Developer bundle identifier.

## Useful checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Future scaling ideas

- Replace local storage with a typed persistence adapter backed by Supabase, PostgreSQL, or SQLite
- Add authentication and per-user program start dates
- Integrate Apple Health, Google Fit, and wearable step syncing
- Add notifications for check-ins, water, walking, and planned workouts
- Support progress photo upload storage and encrypted body metrics
- Add AI coaching insights that summarize trends without guilt-based language
- Build a coach/admin view for accountability groups
- Add offline-first service worker caching for full PWA behavior
- Add native iOS plugins through Capacitor for haptics, notifications, HealthKit, and camera/photo upload
