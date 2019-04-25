import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { VideoFragment } from '../models/VideoFragment';
import { Video } from '../models/Video';

class FragmentScale {
  scale: number;
  translate: number;
}

@Component({
  selector: 'app-fragment-timeline',
  templateUrl: './fragment-timeline.component.html',
  styleUrls: ['./fragment-timeline.component.scss']
})
export class FragmentTimelineComponent implements OnChanges {

  @Input() fragments: VideoFragment[];
  @Input() video: Video;
  fragmentScales: FragmentScale[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'fragments') {
        const change = changes[propName];
        this.fragmentScales = this.calculatePercentages(change.currentValue);
      }
    }
  }

  /* Determine Translate and Scale Percentages For Given Fragment */
  private calculatePercentages(fragments: VideoFragment[]): FragmentScale[] {
    const fragmentScales: FragmentScale[] = [];
    fragments.forEach((value) => {
      const newFragmentScale = new FragmentScale();
      newFragmentScale.translate = (value.StartTime / this.video.VideoLength) * 100;
      newFragmentScale.scale = (value.EndTime - value.StartTime) / this.video.VideoLength;
      console.log(`Fragment : ${value.StartTime}: ${value.EndTime} : ${this.video.VideoLength}`);
      console.log(`Fragment Scale: ${newFragmentScale.translate}: ${newFragmentScale.scale}`);
      fragmentScales.push(newFragmentScale);
    });
    return fragmentScales;
  }

}


