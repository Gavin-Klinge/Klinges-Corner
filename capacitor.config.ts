import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.klingescorner.consistencyfit',
  appName: 'Consistency Fit',
  webDir: 'out',
  bundledWebRuntime: false,
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
  },
};

export default config;
