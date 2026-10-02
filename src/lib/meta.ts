export function pageMeta(title: string, description: string) {
  const t = `${title} | Ollie`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}

export function childName(n: string) {
  return n.trim() || "your child";
}
