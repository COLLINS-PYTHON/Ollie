import type { CapacitorConfig } from "@capacitor/cli";

// Ollie native iOS shell.
// The WebView loads the live published web app, so every publish here reaches
// iOS without a new store build. If we later move to a fully bundled build,
// remove `server.url` and set up a static SPA output in `webDir`.
const config: CapacitorConfig = {
  appId: "com.ollie.learning",
  appName: "Ollie",
  webDir: "native-shell",
  server: {
    url: "https://start-forge-engine.lovable.app",
    errorPath: "offline.html",
    androidScheme: "https",
  },
  ios: {
    // Let scrollable content respect the notch/home-indicator safe areas.
    contentInset: "always",
    backgroundColor: "#F2F4FC",
  },
};

export default config;
