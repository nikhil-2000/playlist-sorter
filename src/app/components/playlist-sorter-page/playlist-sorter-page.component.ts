import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Playlist} from '../../models/playlist';
import {Track} from '../../models/track';
import {Image} from '../../models/image';
import * as IJS from 'image-js';
import {error} from 'selenium-webdriver';



@Component({
  selector: 'app-playlist-sorter-page',
  templateUrl: './playlist-sorter-page.component.html',
  styleUrls: ['./playlist-sorter-page.component.css']
})
export class PlaylistSorterPageComponent implements OnInit {


  constructor(private spotifyService: SpotifyService) { }
  playlist: Playlist;
  tracks: Array<Track>;
  total: number;

  method = '';
  order = 1;

  ngOnInit(): void {
    this.playlist = this.spotifyService.chosenPlaylist;
    this.total = this.playlist.getTracks().total;
    this.tracks = [];
    this.getTracks();

    // console.log(this.playlist);
    // this.playlist = mockPlaylist;
    // this.tracks = tracks;
  }

  convertToTracks(data): Array<Track> {
    const tracks = data.items.map(track => track.track);
    return tracks.map(track => new Track(track));
  }

  getTracks(): void {
    let offset = 0;
    const limit = 50;
    while (this.total > offset) {
      this.spotifyService.getTracks(this.playlist, limit, offset).subscribe(
        data => {
          const newTracks = this.convertToTracks(data);
          this.spotifyService.getMultipleTrackFeatures(newTracks).subscribe(
            audio_data => {
              audio_data = audio_data.audio_features;
              audio_data.forEach((t, i) => newTracks[i].addAudioFeatures(t));
            }
          );
          this.tracks = this.tracks.concat(newTracks);
        }
      );
      offset = offset + limit;
    }
  }

  sortTracks(): void {

    if (this.method.toLowerCase() === 'colour') {
      this.sortByColour();
    }else{
      this.tracks = this.tracks
        .sort((a, b) => (a[this.method.toLowerCase()] < b[this.method.toLowerCase()] ? -this.order : this.order));
    }
  }

  sortByColour(): void{
    // this.tracks = this.tracks.map(t => {
    //   t.image.picture = IJS.Image.load(t.image.url);
    //   return t;
    // });
    // const i = new IJS.Image();
    // console.log(this.tracks);
  }

  updateOrder(order: boolean): void{
    this.order = order ? 1 : -1;
    this.sortTracks();
  }

  updateMethod(method: string): void {
    this.method = method;
    this.sortTracks();
  }

  addToSpotify(): void {
    const isYes = confirm('Are you sure?');
    if (isYes && this.method !== '') {
      console.log('Adding Playlist');
      this.spotifyService.createNewPlaylist(this.method, this.tracks, this.playlist);
    }

    if (this.method === '') {
      alert('Pick a way to sort');
    }
  }

}
