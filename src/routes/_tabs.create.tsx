import { createFileRoute } from "@tanstack/react-router";
import { TabScreen } from "@/components/ollie/Screen";

export const Route = createFileRoute("/_tabs/create")({
  head: () => ({
    meta: [
      { title: "Create | Ollie" },
      { name: "description", content: "Make pictures and stories with Ollie." },
      { property: "og:title", content: "Create | Ollie" },
      { property: "og:description", content: "Make pictures and stories with Ollie." },
    ],
  }),
  component: () => <TabScreen title="Create" />,
});
