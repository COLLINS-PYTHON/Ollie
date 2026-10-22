// Ambient depth scenery for atmospheric screens: an underwater-feeling blue world
// built only from the existing palette. Abstract light and drifting motes — never
// literal ocean props (no plants, fish, or bubbles).
export function AmbientDepth() {
  return (
    <div className="ambient-depth" aria-hidden="true">
      <span className="ambient-shaft" />
      <span className="ambient-shaft ambient-shaft-b" />
      <span className="ambient-mote ambient-mote-a" />
      <span className="ambient-mote ambient-mote-b" />
      <span className="ambient-mote ambient-mote-c" />
      <span className="ambient-mote ambient-mote-d" />
    </div>
  );
}
