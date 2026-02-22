# VSingles Android App (Capacitor)

The web app is wrapped as a native Android app using [Capacitor](https://capacitorjs.com/). The same React code runs inside a WebView.

## Prerequisites

- **Node.js & Yarn** (already used for the web app)
- **Android Studio** – [download](https://developer.android.com/studio)
- **JDK 17** – usually installed with Android Studio

## First-time setup

1. **Install dependencies**
   ```bash
   cd fe
   yarn install
   ```

2. **Build the web app for Android** (uses relative paths for `file://` loading)
   ```bash
   yarn build:android
   ```

3. **Add the Android platform** (only needed once)
   ```bash
   npx cap add android
   ```

4. **Sync the built web app into the Android project**
   ```bash
   yarn cap:sync
   ```

5. **Open the project in Android Studio**
   ```bash
   yarn cap:open
   ```
   Then in Android Studio: **Run** (green play) to build and run on an emulator or device.

## Daily workflow

- After changing the web app, rebuild and sync:
  ```bash
  yarn build:android
  yarn cap:sync
  ```
- Or use the shortcut:
  ```bash
  yarn android
  ```
  (builds, syncs, and opens Android Studio)

## API / backend URL

The app loads the same JavaScript as the web build. To point the app at your API:

- **Production:** Build with `VITE_API_BASE_URL=https://vsingles.club yarn build:android` (or set in `.env.production`).
- **Local backend:** For development you can set `server.url` in `capacitor.config.mjs` to your dev server (e.g. `http://10.0.2.2:40000` for Android emulator) and use **Live Reload** so the app loads from your machine.

## Building a release APK/AAB

1. In Android Studio: **Build → Generate Signed Bundle / APK**.
2. Create or use a keystore, then build the release variant.
3. The AAB can be uploaded to Google Play; the APK can be shared for sideloading.

## App ID

- **App ID (package):** `club.vsingles.app` (set in `capacitor.config.json` as `appId`).
- To change it, edit `appId` in `capacitor.config.json`, then run `yarn cap:sync` and update the package name in Android Studio if needed.
