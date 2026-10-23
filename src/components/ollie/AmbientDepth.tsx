// Ambient depth scenery: soft light shafts and rising bubbles built from the palette.
// `quiet` screens (no characters or animation) get a denser, livelier bubble field.
const BUBBLES = ["a", "b", "c", "d", "e", "f", "g", "h"];
export function AmbientDepth({ quiet = false }: { quiet?: boolean }) {
  return (
    <div className={`ambient-depth${quiet ? " ambient-quiet" : ""}`} aria-hidden="true">
      <span className="ambient-shaft" />
      <span className="ambient-shaft ambient-shaft-b" />
      {BUBBLES.map((b) => <span key={b} className={`ambient-mote ambient-mote-${b}`} />)}
    </div>
  );
}
