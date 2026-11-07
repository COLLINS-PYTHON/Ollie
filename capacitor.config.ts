import type { CapacitorConfig } from "@capacitor/cli";

// Ollie native iOS shell.
// The hosted TanStack app keeps its server functions. A bundled offline page
// provides recovery when first launch cannot connect; this is not offline AI.
// Native capability or substantial app changes still require store review.
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
