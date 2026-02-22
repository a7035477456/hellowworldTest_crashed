import { defineConfig } from '@capacitor/cli';

export default defineConfig({
  appId: 'club.vsingles.app',
  appName: 'VSingles',
  webDir: 'dist',
  server: {
    // Allow live reload to your dev server when running in app (optional)
    // url: 'http://localhost:3000',
    // cleartext: true
  },
  android: {
    allowMixedContent: true
  }
});
