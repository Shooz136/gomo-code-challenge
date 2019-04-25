import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoViewComponent } from './video-view/video-view.component';
import { UserViewComponent } from './user-view/user-view.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'user/:user', component: UserViewComponent},
  {path: 'welcome', component: WelcomeComponent},
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
