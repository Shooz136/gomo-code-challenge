import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { WatchedVideo } from '../models/WatchedVideo';
import { Video } from '../models/Video';
import { Observable, PartialObserver } from 'rxjs';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit, OnChanges {

  @Input()
  watchedVideo: WatchedVideo;

  video: Video;


  constructor(private readonly afs: AngularFirestore) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'watchedVideo') {
        const change = changes[propName];
        new AngularFirestoreDocument<Video>(change.currentValue.VideoID, this.afs)
          .valueChanges().subscribe((value: Video) => {
            this.video = value;
          });
      }
    }
  }
}
