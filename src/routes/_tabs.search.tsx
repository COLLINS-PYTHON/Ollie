import { createFileRoute } from "@tanstack/react-router";
import { TabScreen } from "@/components/ollie/Screen";

export const Route = createFileRoute("/_tabs/search")({
  head: () => ({
    meta: [
      { title: "Search | Ollie" },
      { name: "description", content: "Ask Ollie anything and learn safely." },
      { property: "og:title", content: "Search | Ollie" },
      { property: "og:description", content: "Ask Ollie anything and learn safely." },
    ],
  }),
  component: () => <TabScreen title="Search" />,
});
