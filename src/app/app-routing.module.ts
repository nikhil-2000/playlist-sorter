import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChoosePlaylistComponent } from './components/choose-playlist/choose-playlist.component';
import { LoginComponent } from './components/login/login.component';
import { PlaylistSorterPageComponent} from './components/playlist-sorter-page/playlist-sorter-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'choose-playlist', component: ChoosePlaylistComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'sorter', component: PlaylistSorterPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
