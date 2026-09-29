import { createFileRoute } from "@tanstack/react-router";
import { TabScreen } from "@/components/ollie/Screen";

export const Route = createFileRoute("/_tabs/trail")({
  head: () => ({
    meta: [
      { title: "Trail | Ollie" },
      { name: "description", content: "Follow your Learning Trail, one day at a time." },
      { property: "og:title", content: "Trail | Ollie" },
      { property: "og:description", content: "Follow your Learning Trail, one day at a time." },
    ],
  }),
  component: () => <TabScreen title="Trail" />,
});
