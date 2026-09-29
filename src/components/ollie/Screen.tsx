import type { ReactNode } from "react";

export function ScreenTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-title text-foreground">{children}</h1>;
}

export function TabScreen({ title }: { title: string }) {
  return (
    <main className="screen-enter mx-auto min-h-screen w-full max-w-md bg-background px-5 pb-32 pt-16">
      <ScreenTitle>{title}</ScreenTitle>
    </main>
  );
}
