import { useId, type CSSProperties } from "react";

export function LessonArt({ categoryId, topicId = "", title, className = "", animated = true }: {
  categoryId: string; topicId?: string; title: string; className?: string; animated?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const tint = { "--lesson-ink": `var(--cat-${categoryId === "custom" ? "tech" : categoryId})` } as CSSProperties;
  const motion = animated ? "lesson-motion" : "";
  const star = (x: number, y: number) => <path key={`${x}-${y}`} d={`M${x} ${y - 6}v12m-6-6h12`} className="lesson-line" />;
  let scene;
  switch (categoryId) {
    case "space":
      scene = topicId === "moon-phases" ? <>
        <circle cx="160" cy="112" r="65" className="lesson-fill" />
        <path d="M160 47a65 65 0 0 1 0 130c33-18 33-112 0-130Z" className="lesson-paper" />
        <circle cx="128" cy="92" r="12" className="lesson-soft" /><circle cx="146" cy="135" r="8" className="lesson-soft" />
        {[star(53,65),star(265,70),star(240,181),star(73,167)]}
      </> : <>
        <circle cx="160" cy="112" r="44" className="lesson-fill" />
        <ellipse cx="160" cy="112" rx="116" ry="72" className="lesson-line" />
        <g className={motion}><circle cx="260" cy="148" r="20" className="lesson-fill" /><circle cx="68" cy="69" r="12" className="lesson-fill" /></g>
        {[star(264,45),star(44,174),star(211,196)]}
      </>;
      break;
    case "ocean":
      scene = <>
        <path d="M16 168q36-25 72 0t72 0 72 0 72 0M16 196q36-25 72 0t72 0 72 0 72 0" className="lesson-line" />
        <g className={motion}>
          <ellipse cx="157" cy="108" rx="58" ry="40" className="lesson-fill" />
          {topicId === "sea-turtles" ? <><ellipse cx="219" cy="109" rx="19" ry="16" className="lesson-fill" /><path d="m124 78-33-22 11 42m21 36-30 22 13-36m68-40 26-24-8 34m-12 30 24 25-7-36" className="lesson-line" /></> : <path d="m107 106-41-27v59Z" className="lesson-fill" />}
          <circle cx="184" cy="99" r="5" className="lesson-paper" />
        </g><circle cx="243" cy="61" r="9" className="lesson-line" /><circle cx="265" cy="38" r="5" className="lesson-line" />
      </>;
      break;
    case "dinos":
      scene = topicId === "dino-eggs" ? <>
        {[95,160,225].map((x) => <path key={x} d={`M${x} 61c-46 29-47 113 0 113s46-84 0-113Z`} className="lesson-fill" />)}
        <path d="m142 121 16-14 16 16 13-13" className="lesson-paper-line" />
      </> : <g className={motion}>
        <path d="M58 157q43 1 61-38l20-26 37 6 22-42q8-18 35-17l24 16-3 26-28 6-13 61-28 14-4 35h-22l-8-31-28-5-18 36H86l15-48Z" className="lesson-fill" />
        <circle cx="235" cy="62" r="4" className="lesson-paper" /><path d="M44 204h237" className="lesson-line" />
      </g>;
      break;
    case "animals":
      scene = topicId === "snail-shell" ? <>
        <path d="M65 165h173q24-5 14-26l-13-13" className="lesson-line" /><circle cx="149" cy="123" r="49" className="lesson-fill" /><path d="M150 93c-43 0-39 64 0 58 26-4 18-38 0-29" className="lesson-paper-line" />
      </> : topicId === "bird-song" ? <g className={motion}>
        <path d="M80 117q39-64 102-24l48-18-12 35q25 70-49 64l-61-26-31 15 6-37Z" className="lesson-fill" /><path d="m223 108 33 10-34 13" className="lesson-fill" /><circle cx="207" cy="108" r="4" className="lesson-paper" /><path d="M139 186v21m37-23v23" className="lesson-line" />
      </g> : <>
        <ellipse cx="160" cy="123" rx="67" ry="58" className="lesson-fill" /><circle cx="111" cy="71" r="25" className="lesson-fill" /><circle cx="209" cy="71" r="25" className="lesson-fill" /><ellipse cx="160" cy="143" rx="34" ry="24" className="lesson-paper" /><circle cx="135" cy="112" r="6" className="lesson-paper" /><circle cx="185" cy="112" r="6" className="lesson-paper" /><path d="m151 136 9 10 9-10Z" className="lesson-fill" />
      </>;
      break;
    case "body":
      scene = topicId === "bones-fuse" ? <path d="M97 58a17 17 0 1 0-19 27l133 92a17 17 0 1 0 22-28L104 64Z" className="lesson-fill" /> : <>
        <path d="M160 190 75 109C21 50 112 15 160 77c48-62 139-27 85 32Z" className="lesson-fill" />
        <path d="M61 119h58l15-27 26 55 19-31h76" className={`lesson-paper-line ${motion}`} />
      </>;
      break;
    case "math":
      scene = topicId === "shapes" ? <>
        <circle cx="85" cy="94" r="38" className="lesson-fill" /><path d="m226 52 46 77h-92Z" className="lesson-fill" /><rect x="128" y="145" width="60" height="60" rx="5" className="lesson-fill" />
      </> : <>
        <circle cx="98" cy="113" r="50" className="lesson-line" /><path d="M183 98h80m-80 25h80" className="lesson-line" />
        <path d="M71 69a50 50 0 0 1 70 69l-43-25Z" className="lesson-fill" />
      </>;
      break;
    case "art":
      scene = <>
        <path d="M155 39c-126-3-139 146-29 160 34 4 23-37 47-37 18 0 26 24 49 7 51-38 0-128-67-130Z" className="lesson-fill" />
        {[[96,92],[131,68],[180,72],[211,108]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="12" className="lesson-paper" />)}
        <path d="m103 194 111-110 15 15-110 112Z" className={`lesson-line ${motion}`} />
      </>;
      break;
    case "weather":
      scene = topicId === "snowflakes" ? <g className={motion}>
        <path d="M160 43v160M91 83l138 80M91 163l138-80m-81-31 12 14 12-14m-24 148 12-14 12 14M97 99l20-5-5-20m96 100-20 5 5 20M97 146l20 5-5 20m96-100-20-5 5-20" className="lesson-line" />
      </g> : <>
        <circle cx="209" cy="75" r="34" className="lesson-soft" /><path d="M81 139c-52 0-42-62-3-63 5-50 90-50 97 0 57-5 60 63 10 63Z" className="lesson-fill" />
        <g className={motion}><path d="m98 159-8 20m47-20-8 20m47-20-8 20" className="lesson-line" /></g>
      </>;
      break;
    case "history":
      scene = topicId === "castles" ? <>
        <path d="M73 199V80h25v20h23V80h25v119m28 0V80h25v20h23V80h25v119M146 121h28v78" className="lesson-fill" /><path d="M151 199v-37q9-19 18 0v37" className="lesson-paper-line" />
      </> : <>
        <path d="m42 192 94-140 97 140Zm100 0 69-106 70 106Z" className="lesson-fill" /><path d="m136 52 19 140m56-106 17 106M44 211h237" className="lesson-line" />
      </>;
      break;
    case "music":
      scene = topicId === "drums" ? <>
        <path d="M90 95v79c0 35 140 35 140 0V95" className="lesson-fill" /><ellipse cx="160" cy="95" rx="70" ry="24" className="lesson-line" /><path d="m108 40 91 37m-3-35-78 36" className={`lesson-line ${motion}`} />
      </> : <g className={motion}>
        <path d="M122 164V66l105-24v101" className="lesson-line" /><ellipse cx="103" cy="174" rx="27" ry="20" className="lesson-fill" /><ellipse cx="208" cy="153" rx="27" ry="20" className="lesson-fill" /><path d="m124 92 101-24" className="lesson-line" />
      </g>;
      break;
    case "tech":
      scene = <>
        <rect x="83" y="66" width="154" height="122" rx="30" className="lesson-fill" /><path d="M160 66V45m-77 61H61v51h22m154-51h22v51h-22" className="lesson-line" /><circle cx="160" cy="37" r="8" className="lesson-fill" /><circle cx="128" cy="113" r="12" className="lesson-paper" /><circle cx="192" cy="113" r="12" className="lesson-paper" /><path d="M126 153h68" className={`lesson-paper-line ${motion}`} />
      </>;
      break;
    default:
      scene = <>
        <path d="M160 79Q98 42 53 68v124q56-20 107 15 51-35 107-15V68q-45-26-107 11Z" className="lesson-fill" /><path d="M160 79v128M80 98l53 16m-53 9 53 16m54-25 53-16m-53 41 53-16" className="lesson-paper-line" />
      </>;
  }
  return <svg viewBox="0 0 320 240" role="img" aria-labelledby={`${uid}-title`} className={`lesson-art ${className}`} style={tint}>
    <title id={`${uid}-title`}>{title}</title>
    <defs><linearGradient id={`${uid}-wash`} x2="0" y2="1"><stop stopColor="var(--lesson-ink)" stopOpacity=".12" /><stop offset="1" stopColor="var(--card)" /></linearGradient></defs>
    <rect width="320" height="240" rx="28" fill={`url(#${uid}-wash)`} />
    {scene}
  </svg>;
}