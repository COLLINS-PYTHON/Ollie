/** Original lightweight characters with subject-specific, reduced-motion-aware movement. */
export function OnboardingCompanions({ scene }: { scene: "reader" | "garden" }) {
  return <div className="onboarding-companions" aria-hidden="true">
    <svg viewBox="0 0 300 130" className={`companion-scene companion-scene-${scene}`} fill="none">
      <ellipse className="companion-shadow" cx="150" cy="116" rx="88" ry="5" />
      {scene === "reader" ? <>
        <g className="companion-reader">
          <path className="companion-blue" d="M111 51L106 20L130 34Q150 23 171 34L193 20L189 54Q199 104 150 110Q102 104 111 51Z" />
          <path className="companion-soft" d="M150 67C115 64 112 96 150 104C188 96 185 64 150 67Z" />
          <path className="companion-teal" d="M111 63Q91 75 108 95Q123 91 121 73Z" />
          <path className="companion-teal" d="M188 63Q211 73 193 95Q178 91 180 73Z" />
          <ellipse className="companion-paper" cx="132" cy="54" rx="17" ry="19" />
          <ellipse className="companion-paper" cx="169" cy="54" rx="17" ry="19" />
          <g className="companion-eyes"><ellipse className="companion-ink" cx="135" cy="56" rx="5" ry="7" /><ellipse className="companion-ink" cx="166" cy="56" rx="5" ry="7" /><circle className="companion-paper" cx="137" cy="53" r="2" /><circle className="companion-paper" cx="168" cy="53" r="2" /></g>
          <path className="companion-teal" d="M144 67Q150 63 156 67L150 75Z" />
          <path className="companion-detail" d="M130 86L133 89M148 85L151 89M168 86L165 89" />
        </g>
        <path className="companion-blue" d="M78 99Q115 93 150 108Q185 93 222 99L221 118Q184 111 150 124Q116 111 79 118Z" />
        <g className="companion-page"><path className="companion-paper" d="M81 93Q114 89 150 105Q186 89 219 93L216 112Q183 107 150 120Q116 107 84 112Z" /><path className="companion-book-line" d="M150 105V120M94 100Q119 100 138 109M94 106Q114 106 130 111M164 109Q185 100 207 100M174 111Q191 106 207 106" /></g>
      </> : <>
        <g className="companion-garden">
          <path className="companion-teal" d="M107 101Q103 109 95 112L115 112L124 100M175 101Q178 108 188 112L165 112L156 101" />
          <path className="companion-teal" d="M113 80Q77 64 74 87Q75 104 117 102L181 101Q198 97 193 86L180 83Z" />
          <path className="companion-soft" d="M106 94Q107 51 146 51Q184 52 185 94Z" />
          <path className="companion-shell-line" d="M110 89L130 77L145 88L165 76L181 89M130 77L126 58M145 88V94M165 76L169 60" />
          <g className="companion-eyes"><circle className="companion-ink" cx="86" cy="83" r="3" /></g>
          <path className="companion-detail" d="M78 92Q85 97 91 92" />
          <path className="companion-blue" d="M135 51H159L155 67H139Z" />
          <g className="companion-sprout"><path className="companion-detail" d="M147 52V29" /><path className="companion-teal" d="M147 41Q128 44 127 29Q144 26 147 41Z" /><path className="companion-teal" d="M147 33Q149 15 167 20Q165 35 147 33Z" /></g>
        </g>
        <g className="companion-butterfly"><path className="companion-pink" d="M224 45C201 19 199 54 221 53C203 68 226 78 226 56C250 76 253 49 230 51C249 31 225 24 224 45Z" /><path className="companion-detail" d="M224 44L227 60" /></g>
      </>}
    </svg>
  </div>;
}