import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { SpotifyService} from '../../services/spotify.service';
import { Playlist } from '../../models/playlist';
import {Router} from '@angular/router';
import {ChoosePlaylistService} from '../../services/choose-playlist.service';
import {MatTabChangeEvent} from '@angular/material/tabs';


@Component({
  selector: 'app-choose-playlist',
  templateUrl: './choose-playlist.component.html',
  styleUrls: ['./choose-playlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChoosePlaylistComponent implements OnInit {

  // userPlaylists = this.convertToPlaylistObject(mockPlaylists);
  userPlaylists = new Array<Playlist>();
  filteredPlaylists = new Array<Playlist>();
  currentPlaylist: Playlist;
  isUserPlaylists = true;
  nextIsNull = false;
  maxPlaylists = 1000;

  constructor(private router: Router, public spotifyService: SpotifyService, public choosePlaylistService: ChoosePlaylistService) {}

  ngOnInit(): void {
    this.onKey('');
    // While the userPLaylist.next != Null && Loop started
    const limit = 50;
    let offset = 0;
    while (!this.nextIsNull) {
      this.spotifyService.getUserPlaylists(limit, offset).subscribe(
        data => {
          const newPlaylists = this.convertToPlaylistObject(data.items);
          this.userPlaylists = this.userPlaylists.concat(newPlaylists);
          this.onKey('');
        }
      );
      offset = offset + limit;
      if (offset > this.maxPlaylists) {
        this.nextIsNull = true;
      }
    }

    this.choosePlaylistService.playlistSubject.subscribe(
      value => this.currentPlaylist = value
    );
  }

  convertToPlaylistObject(playlistsResponse): Array<Playlist> {
    if (playlistsResponse == null) {return []; }

    const convertedPlaylists = new Array<Playlist>();

    for (const playlistData of playlistsResponse) {
      const playlist = new Playlist(playlistData);
      convertedPlaylists.push(playlist);
    }
    return convertedPlaylists;
  }

  onKey(filterTerm): void {
    if (this.isUserPlaylists) {
      this.filteredPlaylists = filterTerm === '' ? this.userPlaylists :
        this.userPlaylists.filter((element, i, array) => {
          return element.getName().toLowerCase().includes(filterTerm.toLowerCase());
        });
    } else {
      if (filterTerm === '') {
        this.filteredPlaylists = [];
      } else {
        this.spotifyService.search(filterTerm, 'playlist')
          .subscribe(data => this.filteredPlaylists = this.convertToPlaylistObject(data.playlists.items));
      }
    }
  }

  moveToSorter(): void {
    if (this.currentPlaylist === null) {
      alert('Choose a playlist');
    }else {
      this.spotifyService.chosenPlaylist = this.currentPlaylist;
      this.router.navigate(['/sorter']);
    }
  }

  showUserPlaylists(): void{

    this.isUserPlaylists = true;
    this.onKey('');
  }

  showPlaylistSearch(): void {
    this.isUserPlaylists = false;
    this.onKey('');
  }

  isPlaylistSelected(playlist: Playlist): boolean {
    return false;
    if (this.currentPlaylist === null) {
      console.log("NULL PLAYLIST");
      return false;
    } else {
      console.log("NOT NULL PLAYLIST");
      return playlist.getName() === this.currentPlaylist.getName();
    }
  }

  showCorrectPlaylists(event: MatTabChangeEvent): void{
    if (event.index === 0) {
      this.showUserPlaylists();
    }else{
      this.showPlaylistSearch();
    }
  }

}
