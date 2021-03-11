import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Playlist} from '../../models/playlist';
import {Track} from '../../models/track';
import {Image} from '../../models/image';


@Component({
  selector: 'app-playlist-sorter-page',
  templateUrl: './playlist-sorter-page.component.html',
  styleUrls: ['./playlist-sorter-page.component.css']
})
export class PlaylistSorterPageComponent implements OnInit {
  playlist: Playlist;
  tracks: Array<Track>;


  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.playlist = this.spotifyService.chosenPlaylist;
    this.getTracks();

    // this.startTimer();
  }

  convertToTracks(data): Array<Track> {
    const tracks = data.items.map(track => track.track);
    console.log(tracks);
    const removingNullPreview = tracks.filter(track => track.preview_url !== null);
    console.log(removingNullPreview);
    return removingNullPreview
      .map(track => new Track(track.name, track.preview_url, track.popularity, track.artists, track.album));
  }

  getTracks(): void {
    this.spotifyService.getTracks(this.playlist).subscribe(
      data => {
        this.tracks = this.convertToTracks(data);
        console.log(this.tracks);
      }
    );
  }
}


let mockPlaylist;
const image = new Image();
image.height = 640;
image.url = 'https://mosaic.scdn.co/640/ab67616d0000b2732cd55246d935a8a77cb4859eab67616d0000b27360ec4df52c2d724bc53ffec5ab67616d0000b2736f134f8d843353be21a9706eab67616d0000b273c5649add07ed3720be9d5526';
image.width = 640;
const mockPlaylistData = {
  name: '"Awaken, My Love!"_radio',
  image,
  tracks: {
    href: 'https://api.spotify.com/v1/playlists/0idtEfU8gfSyLNiSCRLnPc/tracks',
    total: 95
  }
};
// mockPlaylist = new Playlist(mockPlaylistData.name, mockPlaylistData.image, mockPlaylistData.tracks);
