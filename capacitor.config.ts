import type { CapacitorConfig } from "@capacitor/cli";

// Ollie native iOS shell.
// The WebView loads the live published web app, so every publish here reaches
// iOS without a new store build. If we later move to a fully bundled build,
// remove `server.url` and set up a static SPA output in `webDir`.
const config: CapacitorConfig = {
  // TODO: replace with the Bundle ID registered on the Apple Developer account.
  appId: "com.ollie.learning",
  appName: "Ollie",
  webDir: "dist",
  server: {
    url: "https://start-forge-engine.lovable.app",
    allowNavigation: ["*.lovable.app"],
    androidScheme: "https",
  },
  ios: {
    // Let scrollable content respect the notch/home-indicator safe areas.
    contentInset: "always",
    backgroundColor: "#F2F4FC",
  },
};

export default config;
