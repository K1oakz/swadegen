import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.swade.charactergenerator',
  appName: 'SWADE Character Forge',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
