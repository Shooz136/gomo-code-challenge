import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { FragmentService } from '../services/fragment-service';
import { WatchedVideo } from '../models/WatchedVideo';
import { AddFragModalComponent } from '../add-frag-modal/add-frag-modal.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  user$: Observable<User>;
  userID: string;

  constructor(private readonly afs: AngularFirestore,
              private readonly route: ActivatedRoute,
              private readonly fragService: FragmentService,
              public dialog: MatDialog,
              public snackbar: MatSnackBar) {}

  ngOnInit() {
    this.user$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => console.log(params.get('user'))),
      tap((params: ParamMap) => this.userID = params.get('user')),
      switchMap(
        (params: ParamMap) => this.afs.doc<User>('users/' + params.get('user')).valueChanges().pipe(
          /* Log Each Video To Console */
          tap((thisUser: User) => console.log(thisUser)),

          /* Coalesce Each Set Of Video Fragments */
          tap((thisUser: User) => thisUser.WatchedVideos.map((val: WatchedVideo) => {
            val.CoalescedFragments = this.fragService.coalesceFragments(val.Fragments);
            val.UVT = this.fragService.calculateUVT(val.CoalescedFragments);
            return val;
          }))
        )
      )
    );
  }

  /* Open The Add Fragment Modal, To Provide User Form To Create New
     Viewed Fragment */
  openDialog() {
    const dialogRef = this.dialog.open(AddFragModalComponent, {
      height: '65%',
      width: '75%',
      data: { user: this.userID },
    });

    dialogRef.afterClosed().subscribe(result => {
      /* This Certainly Needs Improvement - We Can Get More Meaningful Data Back
         From Our Modal */
      if (result) {
        this.snackbar.open('Successfully Added Video Fragment', 'Dismiss');
      } else {
        this.snackbar.open('Error Occurred Adding Video Fragment', 'Dismiss');
      }
    });
  }

}
