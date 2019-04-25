import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from './../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule,
         MatIconModule, MatListModule, MatCardModule, MatTableModule, MatTabsModule,
         MatProgressBarModule, MatFormFieldModule, MatInputModule, MatDialogModule,
         MatSelectModule, MatSnackBarModule, MatExpansionModule} from '@angular/material';

import { NgxGaugeModule } from 'ngx-gauge';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { VideoViewComponent } from './video-view/video-view.component';
import { UserViewComponent } from './user-view/user-view.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FragmentService } from './services/fragment-service';
import { FragmentTimelineComponent } from './fragment-timeline/fragment-timeline.component';
import { AddFragModalComponent } from './add-frag-modal/add-frag-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    VideoViewComponent,
    UserViewComponent,
    WelcomeComponent,
    FragmentTimelineComponent,
    AddFragModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    NgxGaugeModule
  ],
  entryComponents: [
    AddFragModalComponent
  ],
  providers: [AngularFirestore, FragmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
