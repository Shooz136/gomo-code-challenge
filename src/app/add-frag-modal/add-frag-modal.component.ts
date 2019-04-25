import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Video } from '../models/Video';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VideoFragment } from '../models/VideoFragment';
import { User } from '../models/User';
import { WatchedVideo } from '../models/WatchedVideo';

@Component({
  selector: 'app-add-frag-modal',
  templateUrl: './add-frag-modal.component.html',
  styleUrls: ['./add-frag-modal.component.scss']
})
export class AddFragModalComponent implements OnInit {

  videos: Video[];
  videoFragment: VideoFragment = { StartTime: null, EndTime: null };
  selectedVideo: Video = null;

  constructor(private readonly afs: AngularFirestore,
              private dialogRef: MatDialogRef<AddFragModalComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    /* Pull The Snapshot Collection, So We Can Get The Video IDs,
       Transform Into A Normal Video Array - We Don't Need To Listen
       For Changes Here */
    this.afs.collection<Video>('videos').snapshotChanges().pipe(
      tap((value) => console.log(value)),
      map((changes) => {
        const resultArray: Video[] = [];
        changes.forEach((docChange) => {
          if (docChange.type === 'added') {
            resultArray.push({
              VideoLength: docChange.payload.doc.data().VideoLength,
              VideoTitle: docChange.payload.doc.data().VideoTitle,
              VideoID: docChange.payload.doc.id
            });
          }
        });
        return resultArray;
      })
    ).subscribe((videoArray) => this.videos = videoArray);
  }

  /* Return The Max Time Of The Video, For The Max Validator */
  getMaxTimeValue() {
    return this.selectedVideo == null ? 0 : this.selectedVideo.VideoLength;
  }

  addVideoFragment() {

    /* Get A Ref To The Current User */
    const userDoc: AngularFirestoreDocument<User> = this.afs.doc<User>('users/' + this.data.user);

    /* Add The Fragment To An Existing Or New Watched Video, And Then Update Firebase */
    userDoc.valueChanges().pipe(
      /* We Only Want The 1st Value Through This Observable.  We're Observing The Subject Of Our Update,
         So We'll End Up With An Infinite Stream */
      first(),
      map((user) => {
        /* See If This User Has Already Watched This Video */
        let existingVideoIdx: number = user.WatchedVideos
          .findIndex((thisWatchedVideo) => thisWatchedVideo.VideoID.id === this.selectedVideo.VideoID);

        /* If Not, Create A New One */
        if (existingVideoIdx === -1) {
          existingVideoIdx = user.WatchedVideos.push({
            Fragments: [],
            CoalescedFragments: null,
            UVT: null,
            VideoID: this.afs.doc('videos/' + this.selectedVideo.VideoID).ref
          }) - 1;
        }
        /* Get The Reference To The Video Itself */
        const selectedWatchedVideo: WatchedVideo = user.WatchedVideos[existingVideoIdx];
        selectedWatchedVideo.Fragments.push(this.videoFragment);
        return user;
    }))
    .subscribe((user) => {
       /* The Firebase Update Operation Returns A Promise, So We'll Wait For It */
      userDoc.update(user).then(() => {
        console.log('Successfully Added A Fragment');
        this.dialogRef.close(true);
      })
      .catch((error) => {
        console.log(error);
        this.dialogRef.close(false);

      });
    });
  }

}
