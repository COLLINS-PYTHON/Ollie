import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ollie | Safe AI learning for kids" },
      { name: "description", content: "Ollie is a safe AI learning app for kids aged 4 to 12." },
      { property: "og:title", content: "Ollie | Safe AI learning for kids" },
      { property: "og:description", content: "Ollie is a safe AI learning app for kids aged 4 to 12." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/search" });
  },
});
