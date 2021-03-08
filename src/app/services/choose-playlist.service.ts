import { Injectable } from '@angular/core';
import {Playlist} from '../models/playlist';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChoosePlaylistService {

  playlistSubject = new Subject<Playlist>();

  constructor() { }

  setPlaylist(currentPlaylist: Playlist): void{
    console.log('Setting Playlist');
    this.playlistSubject.next(currentPlaylist);
  }

}
