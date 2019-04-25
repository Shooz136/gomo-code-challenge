import { VideoFragment } from '../models/VideoFragment';
import { Injectable } from '@angular/core';

@Injectable()
export class FragmentService {

 /* Coalesce An Array Of Video Fragments, Combining Entries That
    Overlap */
 coalesceFragments(fragments: VideoFragment[]): VideoFragment[] {

  fragments = fragments || [];

  /* Start With A Sorted List */
  fragments = fragments.sort((frag1: VideoFragment, frag2: VideoFragment) => {
    return frag1.StartTime - frag2.StartTime;
  });

  /* Remove Obviously Invalid Entries - Depending On Requirements, This May Be
     A Fatal Error, Logged Somewhere, Or Just Ignored As An Anomaly
     Just Ignoring Them Here, For Brevity's Sake */
  fragments = fragments.filter((fragment: VideoFragment) => {

    return fragment.StartTime != null &&
           fragment.EndTime != null &&
           fragment.StartTime >= 0 &&
           fragment.EndTime >= 0 &&
           fragment.EndTime > fragment.StartTime;
  });

  /* Use A Reduce To Merge Overlapping Fragments */
  fragments = fragments.reduce((prev: VideoFragment[], cur: VideoFragment, idx: number) => {

    console.log(cur);

    /* If The Two Fragments Overlap, And The Current EndTime Is
      Longer Than The Existing EndTime, Update The Existing Endtime */
    if (prev[prev.length - 1] && cur.StartTime <= prev[prev.length - 1].EndTime ) {
      if (cur.EndTime > prev[prev.length - 1].EndTime) {
        prev[prev.length - 1].EndTime = cur.EndTime;
      }
    } else {
      /* Otherwise, If We Don't Overlap, Add The Current Value To The Array */
      prev.push(cur);
    }

    return prev;
  }, []);

  return fragments;
 }

 /* Reduce An Array Of Non-Overlapping Video Fragments Into The Total
    Amount Of Time Watched Of The Video */
 calculateUVT(coalescedFragments: VideoFragment[]): number {
    return coalescedFragments.reduce((totalTime: number, cur: VideoFragment) => {
      return totalTime + (cur.EndTime - cur.StartTime);
    }, 0);
 }

}
