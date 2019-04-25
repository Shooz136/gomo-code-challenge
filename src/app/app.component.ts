import { Component } from '@angular/core';
import { Video } from './models/Video';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  videos$: Observable<Video[]>;
  title = 'gomo-code-challenge';

  constructor(private readonly afs: AngularFirestore) {
    console.log('Loading!');
    this.videos$ = afs.collection<Video>('videos').valueChanges().pipe(
      tap((data: Video[]) => console.log(data) )
    );
  }
}
