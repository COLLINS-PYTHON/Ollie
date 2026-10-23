import ollie from "@/assets/whale-curious.png";

/** The one way Ollie appears as a chat counterpart everywhere:
    a centered round photo with the name underneath (iOS contact-header style).
    Drop into any flex-col items-center gap-1 container. */
export function OllieChatHeader({ avatarClassName = "" }: { avatarClassName?: string }) {
  return (
    <>
      <img
        src={ollie}
        alt="Ollie"
        className={`size-10 rounded-full bg-surface object-contain p-0.5 ${avatarClassName}`}
        width={40}
        height={40}
      />
      <p className="text-body font-bold text-foreground">Ollie</p>
    </>
  );
}
