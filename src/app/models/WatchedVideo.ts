import { VideoFragment } from './VideoFragment';
import { DocumentReference } from '@angular/fire/firestore';

export interface WatchedVideo {
  Fragments: VideoFragment[];
  CoalescedFragments: VideoFragment[];
  VideoID: DocumentReference;
  UVT: number;
}
