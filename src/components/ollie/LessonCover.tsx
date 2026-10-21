import { LessonArt } from './LessonArt';
/** The same topic renderer is used in previews, playback and Trail keepsakes. */
export function LessonCover(props: { categoryId:string; topicId?:string; title:string; className?:string }) { return <LessonArt {...props} animated={false}/>; }
