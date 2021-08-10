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

  userPlaylists = this.convertToPlaylistObject(mockPlaylists);
  filteredPlaylists = new Array<Playlist>();
  currentPlaylist = new Playlist('', null, null);
  isUserPlaylists = true;


  constructor(private router: Router, public spotifyService: SpotifyService, public choosePlaylistService: ChoosePlaylistService) {}

  ngOnInit(): void {
    this.onKey('');
    this.spotifyService.getUserPlaylists().subscribe(
      data => {
        this.userPlaylists = this.convertToPlaylistObject(data.items);
        this.onKey('');
      }
    );
    this.choosePlaylistService.playlistSubject.subscribe(
      value => this.currentPlaylist = value
    );
    console.log(this.userPlaylists);
  }

  convertToPlaylistObject(playlistsResponse): Array<Playlist> {
    if (playlistsResponse == null) {return []; }

    const convertedPlaylists = new Array<Playlist>();

    for (const playlistData of playlistsResponse) {
      const playlist = new Playlist(playlistData.name, playlistData.images[0], playlistData.tracks);
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
    if (this.currentPlaylist.getName() === '') {
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
    return playlist.getName() === this.currentPlaylist.getName();
  }

  showCorrectPlaylists(event: MatTabChangeEvent): void{
    if (event.index === 0) {
      this.showUserPlaylists();
    }else{
      this.showPlaylistSearch();
    }
  }

}

const mockData = {
  href: 'https://api.spotify.com/v1/users/217lrmojbxm6rs62qttjjnv4i/playlists?offset=0&limit=20',
  items: [
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/0idtEfU8gfSyLNiSCRLnPc'
      },
      href: 'https://api.spotify.com/v1/playlists/0idtEfU8gfSyLNiSCRLnPc',
      id: '0idtEfU8gfSyLNiSCRLnPc',
      images: [
        {
          height: 640,
          url: 'https://mosaic.scdn.co/640/ab67616d0000b2732cd55246d935a8a77cb4859eab67616d0000b27360ec4df52c2d724bc53ffec5ab67616d0000b2736f134f8d843353be21a9706eab67616d0000b273c5649add07ed3720be9d5526',
          width: 640
        },
        {
          height: 300,
          url: 'https://mosaic.scdn.co/300/ab67616d0000b2732cd55246d935a8a77cb4859eab67616d0000b27360ec4df52c2d724bc53ffec5ab67616d0000b2736f134f8d843353be21a9706eab67616d0000b273c5649add07ed3720be9d5526',
          width: 300
        },
        {
          height: 60,
          url: 'https://mosaic.scdn.co/60/ab67616d0000b2732cd55246d935a8a77cb4859eab67616d0000b27360ec4df52c2d724bc53ffec5ab67616d0000b2736f134f8d843353be21a9706eab67616d0000b273c5649add07ed3720be9d5526',
          width: 60
        }
      ],
      name: '"Awaken, My Love!"_radio',
      owner: {
        display_name: 'Nikhil Patel',
        external_urls: {
          spotify: 'https://open.spotify.com/user/217lrmojbxm6rs62qttjjnv4i'
        },
        href: 'https://api.spotify.com/v1/users/217lrmojbxm6rs62qttjjnv4i',
        id: '217lrmojbxm6rs62qttjjnv4i',
        type: 'user',
        uri: 'spotify:user:217lrmojbxm6rs62qttjjnv4i'
      },
      primary_color: null,
      public: true,
      snapshot_id: 'Miw0MTY4NzQzNzhhMjkyZWM2N2UzNWNlOTgzMDUxYzY1MDVkNTBlNDlk',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/0idtEfU8gfSyLNiSCRLnPc/tracks',
        total: 95
      },
      type: 'playlist',
      uri: 'spotify:playlist:0idtEfU8gfSyLNiSCRLnPc'
    },
    {
      collaborative: false,
      description: 'ALL YOUR FAVOURITE CAR SONGS',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/4WvehPsz1dJo2M5fXmSC2i'
      },
      href: 'https://api.spotify.com/v1/playlists/4WvehPsz1dJo2M5fXmSC2i',
      id: '4WvehPsz1dJo2M5fXmSC2i',
      images: [
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67706c0000da84693d4cae11a1d7e988a594a9',
          width: 300
        }
      ],
      name: 'Dad songs',
      owner: {
        display_name: 'Nikhil Patel',
        external_urls: {
          spotify: 'https://open.spotify.com/user/217lrmojbxm6rs62qttjjnv4i'
        },
        href: 'https://api.spotify.com/v1/users/217lrmojbxm6rs62qttjjnv4i',
        id: '217lrmojbxm6rs62qttjjnv4i',
        type: 'user',
        uri: 'spotify:user:217lrmojbxm6rs62qttjjnv4i'
      },
      primary_color: null,
      public: true,
      snapshot_id: 'NjcsOWFjZjkxYTMxZTcyMDI1M2NhMjIxZGJjNDY1ZDg0YWI0M2MyMjBhNA==',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/4WvehPsz1dJo2M5fXmSC2i/tracks',
        total: 65
      },
      type: 'playlist',
      uri: 'spotify:playlist:4WvehPsz1dJo2M5fXmSC2i'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/7jHEx7oHxN4B7PKCLapcq9'
      },
      href: 'https://api.spotify.com/v1/playlists/7jHEx7oHxN4B7PKCLapcq9',
      id: '7jHEx7oHxN4B7PKCLapcq9',
      images: [
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67706c0000da84944c8ef30571590ba05b142a',
          width: 300
        }
      ],
      name: 'Jazz Study Music',
      owner: {
        display_name: 'Serena Lau',
        external_urls: {
          spotify: 'https://open.spotify.com/user/_siri_xox'
        },
        href: 'https://api.spotify.com/v1/users/_siri_xox',
        id: '_siri_xox',
        type: 'user',
        uri: 'spotify:user:_siri_xox'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MTMsMGQ0YTNiNTQzZDAzMmViMTVkM2VlNGE1NzY5YmM2NGIxMjk5YjAwNQ==',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/7jHEx7oHxN4B7PKCLapcq9/tracks',
        total: 47
      },
      type: 'playlist',
      uri: 'spotify:playlist:7jHEx7oHxN4B7PKCLapcq9'
    },
    {
      collaborative: false,
      description: 'Time for Your Summer Rewind! We’ve made you a new playlist featuring your old summer favorites.',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1CAfTu3T9Z1jzk'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1CAfTu3T9Z1jzk',
      id: '37i9dQZF1CAfTu3T9Z1jzk',
      images: [
        {
          height: null,
          url: 'https://lineup-images.scdn.co/summer-rewind-2020_LARGE-en.jpg',
          width: null
        }
      ],
      name: 'Your Summer Rewind',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MjY1NDgyMDMsMDAwMDAwMDBjMjJlZWJiNzU5MzU5ZjlkY2YyNDZiMGUyNzY3MTA3MA==',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1CAfTu3T9Z1jzk/tracks',
        total: 50
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1CAfTu3T9Z1jzk'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1E8MER9OT1zni6'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E8MER9OT1zni6',
      id: '37i9dQZF1E8MER9OT1zni6',
      images: [
        {
          height: null,
          url: 'https://seeded-session-images.scdn.co/v1/img/track/5SkRLpaGtvYPhw02vZhQQ9/en',
          width: null
        }
      ],
      name: 'All Falls Down Radio',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MjY2ODE1MjcsMDAwMDAwMDBkZTVjNzRmYTYwMjljOWZhOWNhMmMyYzYxYmYwZGZhYQ==',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E8MER9OT1zni6/tracks',
        total: 50
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1E8MER9OT1zni6'
    },
    {
      collaborative: false,
      description: 'The songs you can’t get enough of right now.',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1EpvOgaPBLbJhU'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EpvOgaPBLbJhU',
      id: '37i9dQZF1EpvOgaPBLbJhU',
      images: [
        {
          height: null,
          url: 'https://daily-mix.scdn.co/covers/on_repeat/PZN_On_Repeat_LARGE-en.jpg',
          width: null
        }
      ],
      name: 'On Repeat',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: true,
      snapshot_id: 'MTYwMDgyODIxNywwMDAwMDAwMDMxMTYxM2NhYTU0NzAyMzRkZTVhMjUwYjBlN2NjMGMz',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EpvOgaPBLbJhU/tracks',
        total: 30
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1EpvOgaPBLbJhU'
    },
    {
      collaborative: false,
      description: 'Past songs that you couldn\'t get enough of.',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1EpV4hejCXEeLp'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EpV4hejCXEeLp',
      id: '37i9dQZF1EpV4hejCXEeLp',
      images: [
        {
          height: null,
          url: 'https://daily-mix.scdn.co/covers/backtracks/PZN_Repeat_Rewind_LARGE-en.jpg',
          width: null
        }
      ],
      name: 'Repeat Rewind',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: true,
      snapshot_id: 'MTYwMDgyODIxNywwMDAwMDAwMDMxMTYxM2NhYTU0NzAyMzRkZTVhMjUwYjBlN2NjMGMz',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EpV4hejCXEeLp/tracks',
        total: 30
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1EpV4hejCXEeLp'
    },
    {
      collaborative: false,
      description: 'The songs you loved most this year, all wrapped up.',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1EjpqrXRT0vU8z'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EjpqrXRT0vU8z',
      id: '37i9dQZF1EjpqrXRT0vU8z',
      images: [
        {
          height: null,
          url: 'https://lineup-images.scdn.co/your-top-songs-2018_LARGE-en.jpg',
          width: null
        }
      ],
      name: 'Your Top Songs 2018',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: true,
      snapshot_id: 'MjU3NjA4NDIsMDAwMDAwMDBmZGI3MGMwODY3ZjIxNzcwYTU0YzM1NDZiZTYxNWQ3Yg==',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EjpqrXRT0vU8z/tracks',
        total: 100
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1EjpqrXRT0vU8z'
    },
    {
      collaborative: false,
      description: 'bro want raid supermarket or not | send song requests to @alsttr on insta',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/55V6HUzPnISl7ADpE3yfUD'
      },
      href: 'https://api.spotify.com/v1/playlists/55V6HUzPnISl7ADpE3yfUD',
      id: '55V6HUzPnISl7ADpE3yfUD',
      images: [
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67706c0000da841e2e026c81bb0dd7d60f48b0',
          width: 300
        }
      ],
      name: 'COVID-19 Quarantine Party',
      owner: {
        display_name: 'Alistair Ryan',
        external_urls: {
          spotify: 'https://open.spotify.com/user/1197901351'
        },
        href: 'https://api.spotify.com/v1/users/1197901351',
        id: '1197901351',
        type: 'user',
        uri: 'spotify:user:1197901351'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MTQ4NyxhN2FlNWY3ZDkwZDhkMjkwZjMyMjU4N2ZlMWRmODc3MjI3ODc4ODFj',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/55V6HUzPnISl7ADpE3yfUD/tracks',
        total: 119
      },
      type: 'playlist',
      uri: 'spotify:playlist:55V6HUzPnISl7ADpE3yfUD'
    },
    {
      collaborative: false,
      description: 'His finest work, in one playlist',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1DX86aPVQf2emM'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX86aPVQf2emM',
      id: '37i9dQZF1DX86aPVQf2emM',
      images: [
        {
          height: null,
          url: 'https://i.scdn.co/image/ab67706f000000039a43466fe41b352ad58bd1c3',
          width: null
        }
      ],
      name: 'This Is Sampha',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MTU2ODAxOTUzOCwwMDAwMDAwYTAwMDAwMTY4MjkzM2M4ZTAwMDAwMDE2ZDE1M2Y2MTU1',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX86aPVQf2emM/tracks',
        total: 35
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1DX86aPVQf2emM'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1E8EinfQNTYb4S'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E8EinfQNTYb4S',
      id: '37i9dQZF1E8EinfQNTYb4S',
      images: [
        {
          height: null,
          url: 'https://seeded-session-images.scdn.co/v1/img/track/0v9Wz8o0BT8DU38R4ddjeH/en',
          width: null
        }
      ],
      name: 'No Problem (feat. Lil Wayne & 2 Chainz) Radio',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MjY2ODE1MjcsMDAwMDAwMDA3YzE3NDNjZTcyY2ZjZmUwOTg2MDY5MGZiZDU0YTBiZg==',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E8EinfQNTYb4S/tracks',
        total: 50
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1E8EinfQNTYb4S'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/1uePHCTsBvJIDbeTRqenMF'
      },
      href: 'https://api.spotify.com/v1/playlists/1uePHCTsBvJIDbeTRqenMF',
      id: '1uePHCTsBvJIDbeTRqenMF',
      images: [
        {
          height: 640,
          url: 'https://mosaic.scdn.co/640/ab67616d0000b2731dacfbc31cc873d132958af9ab67616d0000b27352e61456aa4995ba48d94e30ab67616d0000b273d79ba8ad2be777bad0e9924bab67616d0000b273d9194aa18fa4c9362b47464f',
          width: 640
        },
        {
          height: 300,
          url: 'https://mosaic.scdn.co/300/ab67616d0000b2731dacfbc31cc873d132958af9ab67616d0000b27352e61456aa4995ba48d94e30ab67616d0000b273d79ba8ad2be777bad0e9924bab67616d0000b273d9194aa18fa4c9362b47464f',
          width: 300
        },
        {
          height: 60,
          url: 'https://mosaic.scdn.co/60/ab67616d0000b2731dacfbc31cc873d132958af9ab67616d0000b27352e61456aa4995ba48d94e30ab67616d0000b273d79ba8ad2be777bad0e9924bab67616d0000b273d9194aa18fa4c9362b47464f',
          width: 60
        }
      ],
      name: 'kanye pres',
      owner: {
        display_name: 'Niamh Cafferkey',
        external_urls: {
          spotify: 'https://open.spotify.com/user/1162947060'
        },
        href: 'https://api.spotify.com/v1/users/1162947060',
        id: '1162947060',
        type: 'user',
        uri: 'spotify:user:1162947060'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'NDQsMGQyMzM4ODA3NGQxZTcwNjQyZDhhMzBhNjM2ZmEwMjFlNDFmZmFiYg==',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/1uePHCTsBvJIDbeTRqenMF/tracks',
        total: 33
      },
      type: 'playlist',
      uri: 'spotify:playlist:1uePHCTsBvJIDbeTRqenMF'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/0cy9nTPd3wrMoIcYwVSPGX'
      },
      href: 'https://api.spotify.com/v1/playlists/0cy9nTPd3wrMoIcYwVSPGX',
      id: '0cy9nTPd3wrMoIcYwVSPGX',
      images: [
        {
          height: 640,
          url: 'https://mosaic.scdn.co/640/ab67616d0000b2732a7db835b912dc5014bd37f4ab67616d0000b273c5649add07ed3720be9d5526ab67616d0000b273e71dd15fc5bdefd5bff70452ab67616d0000b273f11f1c4ad183b7fa625f8534',
          width: 640
        },
        {
          height: 300,
          url: 'https://mosaic.scdn.co/300/ab67616d0000b2732a7db835b912dc5014bd37f4ab67616d0000b273c5649add07ed3720be9d5526ab67616d0000b273e71dd15fc5bdefd5bff70452ab67616d0000b273f11f1c4ad183b7fa625f8534',
          width: 300
        },
        {
          height: 60,
          url: 'https://mosaic.scdn.co/60/ab67616d0000b2732a7db835b912dc5014bd37f4ab67616d0000b273c5649add07ed3720be9d5526ab67616d0000b273e71dd15fc5bdefd5bff70452ab67616d0000b273f11f1c4ad183b7fa625f8534',
          width: 60
        }
      ],
      name: 'Hi',
      owner: {
        display_name: 'Nikhil Patel',
        external_urls: {
          spotify: 'https://open.spotify.com/user/217lrmojbxm6rs62qttjjnv4i'
        },
        href: 'https://api.spotify.com/v1/users/217lrmojbxm6rs62qttjjnv4i',
        id: '217lrmojbxm6rs62qttjjnv4i',
        type: 'user',
        uri: 'spotify:user:217lrmojbxm6rs62qttjjnv4i'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MjAsZDI3NzAwZjFkMzMwMDljN2FiOGViOGYwYWIxMjMzZTliZTFhZGRlZg==',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/0cy9nTPd3wrMoIcYwVSPGX/tracks',
        total: 19
      },
      type: 'playlist',
      uri: 'spotify:playlist:0cy9nTPd3wrMoIcYwVSPGX'
    },
    {
      collaborative: false,
      description: 'Get to know the shape-shifting, forward thinking, the one and only, Frank Ocean.',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1DXdyjMX5o2vCq'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXdyjMX5o2vCq',
      id: '37i9dQZF1DXdyjMX5o2vCq',
      images: [
        {
          height: null,
          url: 'https://i.scdn.co/image/ab67706f000000038956422a2c850689bf00bde8',
          width: null
        }
      ],
      name: 'This Is Frank Ocean',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MTU5MDA0MjY1OCwwMDAwMDAwODAwMDAwMTcyMzVlZDg2MTkwMDAwMDE3MGFmNDM3MWZk',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXdyjMX5o2vCq/tracks',
        total: 47
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1DXdyjMX5o2vCq'
    },
    {
      collaborative: false,
      description: 'Genre-less. Quality first always. Cover: Gabriel Garzón-Montano',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1DWWBHeXOYZf74'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DWWBHeXOYZf74',
      id: '37i9dQZF1DWWBHeXOYZf74',
      images: [
        {
          height: null,
          url: 'https://i.scdn.co/image/ab67706f00000003699714c269d81e2bb7d80a02',
          width: null
        }
      ],
      name: 'POLLEN',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MTYwMDg3MjAzOSwwMDAwMDJkMDAwMDAwMTc0YmI2OGMzZTQwMDAwMDE3NGIyYWMxZmNm',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DWWBHeXOYZf74/tracks',
        total: 168
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1DWWBHeXOYZf74'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1E4Eo1x67VwxoH'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E4Eo1x67VwxoH',
      id: '37i9dQZF1E4Eo1x67VwxoH',
      images: [
        {
          height: null,
          url: 'https://seeded-session-images.scdn.co/v1/img/artist/3nFkdlSjzX9mRTtwJOzDYB/en',
          width: null
        }
      ],
      name: 'JAY-Z Radio',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MjY2ODE1MjcsMDAwMDAwMDA2YjdmNjE3NzIyNjk3MTMwYzk5MTcyYWQ4M2M3MTZmZg==',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E4Eo1x67VwxoH/tracks',
        total: 50
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1E4Eo1x67VwxoH'
    },
    {
      collaborative: false,
      description: 'Written By Noah Goldstein. The essential songs, all in one playlist. Learn more <a href="https://artists.spotify.com/songwriter/10y7JchLTvoqjb3FZqnDAn">here</a>.',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1EFAown3RRmufu'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EFAown3RRmufu',
      id: '37i9dQZF1EFAown3RRmufu',
      images: [
        {
          height: null,
          url: 'https://i.scdn.co/image/ab67706f000000038bfd64eec88886f532b6df8f',
          width: null
        }
      ],
      name: 'Written By Noah Goldstein',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MjY2ODE1MjcsMDAwMDAwMDA4MmMxNWRhMTEyZDdlNzYwNjRiNWIxYTkxNjE5ODgyOA==',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EFAown3RRmufu/tracks',
        total: 50
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1EFAown3RRmufu'
    },
    {
      collaborative: false,
      description: 'A trip down pop\'s memory lane.',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1DX4v0Y84QklHD'
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX4v0Y84QklHD',
      id: '37i9dQZF1DX4v0Y84QklHD',
      images: [
        {
          height: null,
          url: 'https://i.scdn.co/image/ab67706f000000039a301b01b8ececc2159108eb',
          width: null
        }
      ],
      name: 'Classic Pop Picks',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify'
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MTYwMDg5MTYzNCwwMDAwMDAwMGQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0Mjdl',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX4v0Y84QklHD/tracks',
        total: 50
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1DX4v0Y84QklHD'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/1SbbpezIgnSc4iDp4ckpef'
      },
      href: 'https://api.spotify.com/v1/playlists/1SbbpezIgnSc4iDp4ckpef',
      id: '1SbbpezIgnSc4iDp4ckpef',
      images: [
        {
          height: 640,
          url: 'https://mosaic.scdn.co/640/ab67616d0000b2731e9a057052d59004caf47e22ab67616d0000b2736b18d0490878750cd69abf2cab67616d0000b2739e2f95ae77cf436017ada9cbab67616d0000b273e14f11f796cef9f9a82691a7',
          width: 640
        },
        {
          height: 300,
          url: 'https://mosaic.scdn.co/300/ab67616d0000b2731e9a057052d59004caf47e22ab67616d0000b2736b18d0490878750cd69abf2cab67616d0000b2739e2f95ae77cf436017ada9cbab67616d0000b273e14f11f796cef9f9a82691a7',
          width: 300
        },
        {
          height: 60,
          url: 'https://mosaic.scdn.co/60/ab67616d0000b2731e9a057052d59004caf47e22ab67616d0000b2736b18d0490878750cd69abf2cab67616d0000b2739e2f95ae77cf436017ada9cbab67616d0000b273e14f11f796cef9f9a82691a7',
          width: 60
        }
      ],
      name: 'Now 70 - 99',
      owner: {
        display_name: 'Daniel Wolf Man Stainer',
        external_urls: {
          spotify: 'https://open.spotify.com/user/1177956055'
        },
        href: 'https://api.spotify.com/v1/users/1177956055',
        id: '1177956055',
        type: 'user',
        uri: 'spotify:user:1177956055'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MTE0LGY3YmY0NjY0YTBkOTdlZmMxNWQxYTEyNTc5ZDZkZmRiMzQ3YTExNjU=',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/1SbbpezIgnSc4iDp4ckpef/tracks',
        total: 1235
      },
      type: 'playlist',
      uri: 'spotify:playlist:1SbbpezIgnSc4iDp4ckpef'
    },
    {
      collaborative: false,
      description: '',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/0bL1xOv49B9IR5UaTl441x'
      },
      href: 'https://api.spotify.com/v1/playlists/0bL1xOv49B9IR5UaTl441x',
      id: '0bL1xOv49B9IR5UaTl441x',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f',
          width: 640
        }
      ],
      name: 'Liked from Radio',
      owner: {
        display_name: 'Nikhil Patel',
        external_urls: {
          spotify: 'https://open.spotify.com/user/217lrmojbxm6rs62qttjjnv4i'
        },
        href: 'https://api.spotify.com/v1/users/217lrmojbxm6rs62qttjjnv4i',
        id: '217lrmojbxm6rs62qttjjnv4i',
        type: 'user',
        uri: 'spotify:user:217lrmojbxm6rs62qttjjnv4i'
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MixkM2M5MGM3NzgzMzJlZTRkMGZkM2RkYjA3NzdhODhmY2JiZjZjZjk4',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/0bL1xOv49B9IR5UaTl441x/tracks',
        total: 1
      },
      type: 'playlist',
      uri: 'spotify:playlist:0bL1xOv49B9IR5UaTl441x'
    }
  ],
  limit: 20,
  next: 'https://api.spotify.com/v1/users/217lrmojbxm6rs62qttjjnv4i/playlists?offset=20&limit=20',
  offset: 0,
  previous: null,
  total: 51
};

const mockPlaylists = [
  {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/0idtEfU8gfSyLNiSCRLnPc'
    },
    href: 'https://api.spotify.com/v1/playlists/0idtEfU8gfSyLNiSCRLnPc',
    id: '0idtEfU8gfSyLNiSCRLnPc',
    images: [
      {
        height: 640,
        url: 'https://mosaic.scdn.co/640/ab67616d0000b2732cd55246d935a8a77cb4859eab67616d0000b27360ec4df52c2d724bc53ffec5ab67616d0000b2736f134f8d843353be21a9706eab67616d0000b273c5649add07ed3720be9d5526',
        width: 640
      },
      {
        height: 300,
        url: 'https://mosaic.scdn.co/300/ab67616d0000b2732cd55246d935a8a77cb4859eab67616d0000b27360ec4df52c2d724bc53ffec5ab67616d0000b2736f134f8d843353be21a9706eab67616d0000b273c5649add07ed3720be9d5526',
        width: 300
      },
      {
        height: 60,
        url: 'https://mosaic.scdn.co/60/ab67616d0000b2732cd55246d935a8a77cb4859eab67616d0000b27360ec4df52c2d724bc53ffec5ab67616d0000b2736f134f8d843353be21a9706eab67616d0000b273c5649add07ed3720be9d5526',
        width: 60
      }
    ],
    name: '"Awaken, My Love!"_radio',
    owner: {
      display_name: 'Nikhil Patel',
      external_urls: {
        spotify: 'https://open.spotify.com/user/217lrmojbxm6rs62qttjjnv4i'
      },
      href: 'https://api.spotify.com/v1/users/217lrmojbxm6rs62qttjjnv4i',
      id: '217lrmojbxm6rs62qttjjnv4i',
      type: 'user',
      uri: 'spotify:user:217lrmojbxm6rs62qttjjnv4i'
    },
    primary_color: null,
    public: true,
    snapshot_id: 'Miw0MTY4NzQzNzhhMjkyZWM2N2UzNWNlOTgzMDUxYzY1MDVkNTBlNDlk',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/0idtEfU8gfSyLNiSCRLnPc/tracks',
      total: 95
    },
    type: 'playlist',
    uri: 'spotify:playlist:0idtEfU8gfSyLNiSCRLnPc'
  },
  {
    collaborative: false,
    description: 'ALL YOUR FAVOURITE CAR SONGS',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/4WvehPsz1dJo2M5fXmSC2i'
    },
    href: 'https://api.spotify.com/v1/playlists/4WvehPsz1dJo2M5fXmSC2i',
    id: '4WvehPsz1dJo2M5fXmSC2i',
    images: [
      {
        height: 300,
        url: 'https://i.scdn.co/image/ab67706c0000da84693d4cae11a1d7e988a594a9',
        width: 300
      }
    ],
    name: 'Dad songs',
    owner: {
      display_name: 'Nikhil Patel',
      external_urls: {
        spotify: 'https://open.spotify.com/user/217lrmojbxm6rs62qttjjnv4i'
      },
      href: 'https://api.spotify.com/v1/users/217lrmojbxm6rs62qttjjnv4i',
      id: '217lrmojbxm6rs62qttjjnv4i',
      type: 'user',
      uri: 'spotify:user:217lrmojbxm6rs62qttjjnv4i'
    },
    primary_color: null,
    public: true,
    snapshot_id: 'NjcsOWFjZjkxYTMxZTcyMDI1M2NhMjIxZGJjNDY1ZDg0YWI0M2MyMjBhNA==',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/4WvehPsz1dJo2M5fXmSC2i/tracks',
      total: 65
    },
    type: 'playlist',
    uri: 'spotify:playlist:4WvehPsz1dJo2M5fXmSC2i'
  },
  {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/7jHEx7oHxN4B7PKCLapcq9'
    },
    href: 'https://api.spotify.com/v1/playlists/7jHEx7oHxN4B7PKCLapcq9',
    id: '7jHEx7oHxN4B7PKCLapcq9',
    images: [
      {
        height: null,
        url: 'https://i.scdn.co/image/ab67706c0000bebb944c8ef30571590ba05b142a',
        width: null
      }
    ],
    name: 'Jazz Study Music',
    owner: {
      display_name: 'Serena Lau',
      external_urls: {
        spotify: 'https://open.spotify.com/user/_siri_xox'
      },
      href: 'https://api.spotify.com/v1/users/_siri_xox',
      id: '_siri_xox',
      type: 'user',
      uri: 'spotify:user:_siri_xox'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MTMsMGQ0YTNiNTQzZDAzMmViMTVkM2VlNGE1NzY5YmM2NGIxMjk5YjAwNQ==',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/7jHEx7oHxN4B7PKCLapcq9/tracks',
      total: 47
    },
    type: 'playlist',
    uri: 'spotify:playlist:7jHEx7oHxN4B7PKCLapcq9'
  },
  {
    collaborative: false,
    description: 'Time for Your Summer Rewind! We’ve made you a new playlist featuring your old summer favorites.',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1CAfTu3T9Z1jzk'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1CAfTu3T9Z1jzk',
    id: '37i9dQZF1CAfTu3T9Z1jzk',
    images: [
      {
        height: null,
        url: 'https://lineup-images.scdn.co/summer-rewind-2020_LARGE-en.jpg',
        width: null
      }
    ],
    name: 'Your Summer Rewind',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MjY1NDgyMDMsMDAwMDAwMDBjMjJlZWJiNzU5MzU5ZjlkY2YyNDZiMGUyNzY3MTA3MA==',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1CAfTu3T9Z1jzk/tracks',
      total: 50
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1CAfTu3T9Z1jzk'
  },
  {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1E8MER9OT1zni6'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E8MER9OT1zni6',
    id: '37i9dQZF1E8MER9OT1zni6',
    images: [
      {
        height: null,
        url: 'https://seeded-session-images.scdn.co/v1/img/track/5SkRLpaGtvYPhw02vZhQQ9/en',
        width: null
      }
    ],
    name: 'All Falls Down Radio',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MjY2OTE1ODYsMDAwMDAwMDBkZTVjNzRmYTYwMjljOWZhOWNhMmMyYzYxYmYwZGZhYQ==',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E8MER9OT1zni6/tracks',
      total: 50
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1E8MER9OT1zni6'
  },
  {
    collaborative: false,
    description: 'The songs you can’t get enough of right now.',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1EpvOgaPBLbJhU'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EpvOgaPBLbJhU',
    id: '37i9dQZF1EpvOgaPBLbJhU',
    images: [
      {
        height: null,
        url: 'https://daily-mix.scdn.co/covers/on_repeat/PZN_On_Repeat_LARGE-en.jpg',
        width: null
      }
    ],
    name: 'On Repeat',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: true,
    snapshot_id: 'MTYwMTM0NDk3NCwwMDAwMDAwMDIzM2JhMGNiOTY2N2NiNTQ1MTNmM2Y3YzUyY2M5Yjhh',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EpvOgaPBLbJhU/tracks',
      total: 30
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1EpvOgaPBLbJhU'
  },
  {
    collaborative: false,
    description: 'Past songs that you couldn\'t get enough of.',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1EpV4hejCXEeLp'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EpV4hejCXEeLp',
    id: '37i9dQZF1EpV4hejCXEeLp',
    images: [
      {
        height: null,
        url: 'https://daily-mix.scdn.co/covers/backtracks/PZN_Repeat_Rewind_LARGE-en.jpg',
        width: null
      }
    ],
    name: 'Repeat Rewind',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: true,
    snapshot_id: 'MTYwMTM0NDk3NCwwMDAwMDAwMDIzM2JhMGNiOTY2N2NiNTQ1MTNmM2Y3YzUyY2M5Yjhh',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EpV4hejCXEeLp/tracks',
      total: 30
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1EpV4hejCXEeLp'
  },
  {
    collaborative: false,
    description: 'The songs you loved most this year, all wrapped up.',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1EjpqrXRT0vU8z'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EjpqrXRT0vU8z',
    id: '37i9dQZF1EjpqrXRT0vU8z',
    images: [
      {
        height: null,
        url: 'https://lineup-images.scdn.co/your-top-songs-2018_LARGE-en.jpg',
        width: null
      }
    ],
    name: 'Your Top Songs 2018',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: true,
    snapshot_id: 'MjU3NjA4NDIsMDAwMDAwMDBmZGI3MGMwODY3ZjIxNzcwYTU0YzM1NDZiZTYxNWQ3Yg==',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EjpqrXRT0vU8z/tracks',
      total: 100
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1EjpqrXRT0vU8z'
  },
  {
    collaborative: false,
    description: 'bro want raid supermarket or not | send song requests to @alsttr on insta',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/55V6HUzPnISl7ADpE3yfUD'
    },
    href: 'https://api.spotify.com/v1/playlists/55V6HUzPnISl7ADpE3yfUD',
    id: '55V6HUzPnISl7ADpE3yfUD',
    images: [
      {
        height: null,
        url: 'https://i.scdn.co/image/ab67706c0000bebb1e2e026c81bb0dd7d60f48b0',
        width: null
      }
    ],
    name: 'COVID-19 Quarantine Party',
    owner: {
      display_name: 'Alistair Ryan',
      external_urls: {
        spotify: 'https://open.spotify.com/user/1197901351'
      },
      href: 'https://api.spotify.com/v1/users/1197901351',
      id: '1197901351',
      type: 'user',
      uri: 'spotify:user:1197901351'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MTQ4NyxhN2FlNWY3ZDkwZDhkMjkwZjMyMjU4N2ZlMWRmODc3MjI3ODc4ODFj',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/55V6HUzPnISl7ADpE3yfUD/tracks',
      total: 119
    },
    type: 'playlist',
    uri: 'spotify:playlist:55V6HUzPnISl7ADpE3yfUD'
  },
  {
    collaborative: false,
    description: 'His finest work, in one playlist',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1DX86aPVQf2emM'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX86aPVQf2emM',
    id: '37i9dQZF1DX86aPVQf2emM',
    images: [
      {
        height: null,
        url: 'https://i.scdn.co/image/ab67706f000000039a43466fe41b352ad58bd1c3',
        width: null
      }
    ],
    name: 'This Is Sampha',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MTU2ODAxOTUzOCwwMDAwMDAwYTAwMDAwMTY4MjkzM2M4ZTAwMDAwMDE2ZDE1M2Y2MTU1',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX86aPVQf2emM/tracks',
      total: 35
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1DX86aPVQf2emM'
  },
  {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1E8EinfQNTYb4S'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E8EinfQNTYb4S',
    id: '37i9dQZF1E8EinfQNTYb4S',
    images: [
      {
        height: null,
        url: 'https://seeded-session-images.scdn.co/v1/img/track/0v9Wz8o0BT8DU38R4ddjeH/en',
        width: null
      }
    ],
    name: 'No Problem (feat. Lil Wayne & 2 Chainz) Radio',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MjY2OTE1ODYsMDAwMDAwMDA3YzE3NDNjZTcyY2ZjZmUwOTg2MDY5MGZiZDU0YTBiZg==',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E8EinfQNTYb4S/tracks',
      total: 50
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1E8EinfQNTYb4S'
  },
  {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/1uePHCTsBvJIDbeTRqenMF'
    },
    href: 'https://api.spotify.com/v1/playlists/1uePHCTsBvJIDbeTRqenMF',
    id: '1uePHCTsBvJIDbeTRqenMF',
    images: [
      {
        height: 640,
        url: 'https://mosaic.scdn.co/640/ab67616d0000b2731dacfbc31cc873d132958af9ab67616d0000b27352e61456aa4995ba48d94e30ab67616d0000b273d79ba8ad2be777bad0e9924bab67616d0000b273d9194aa18fa4c9362b47464f',
        width: 640
      },
      {
        height: 300,
        url: 'https://mosaic.scdn.co/300/ab67616d0000b2731dacfbc31cc873d132958af9ab67616d0000b27352e61456aa4995ba48d94e30ab67616d0000b273d79ba8ad2be777bad0e9924bab67616d0000b273d9194aa18fa4c9362b47464f',
        width: 300
      },
      {
        height: 60,
        url: 'https://mosaic.scdn.co/60/ab67616d0000b2731dacfbc31cc873d132958af9ab67616d0000b27352e61456aa4995ba48d94e30ab67616d0000b273d79ba8ad2be777bad0e9924bab67616d0000b273d9194aa18fa4c9362b47464f',
        width: 60
      }
    ],
    name: 'kanye pres',
    owner: {
      display_name: 'Niamh Cafferkey',
      external_urls: {
        spotify: 'https://open.spotify.com/user/1162947060'
      },
      href: 'https://api.spotify.com/v1/users/1162947060',
      id: '1162947060',
      type: 'user',
      uri: 'spotify:user:1162947060'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'NDQsMGQyMzM4ODA3NGQxZTcwNjQyZDhhMzBhNjM2ZmEwMjFlNDFmZmFiYg==',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/1uePHCTsBvJIDbeTRqenMF/tracks',
      total: 33
    },
    type: 'playlist',
    uri: 'spotify:playlist:1uePHCTsBvJIDbeTRqenMF'
  },
  {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/0cy9nTPd3wrMoIcYwVSPGX'
    },
    href: 'https://api.spotify.com/v1/playlists/0cy9nTPd3wrMoIcYwVSPGX',
    id: '0cy9nTPd3wrMoIcYwVSPGX',
    images: [
      {
        height: 640,
        url: 'https://mosaic.scdn.co/640/ab67616d0000b2732a7db835b912dc5014bd37f4ab67616d0000b273c5649add07ed3720be9d5526ab67616d0000b273e71dd15fc5bdefd5bff70452ab67616d0000b273f11f1c4ad183b7fa625f8534',
        width: 640
      },
      {
        height: 300,
        url: 'https://mosaic.scdn.co/300/ab67616d0000b2732a7db835b912dc5014bd37f4ab67616d0000b273c5649add07ed3720be9d5526ab67616d0000b273e71dd15fc5bdefd5bff70452ab67616d0000b273f11f1c4ad183b7fa625f8534',
        width: 300
      },
      {
        height: 60,
        url: 'https://mosaic.scdn.co/60/ab67616d0000b2732a7db835b912dc5014bd37f4ab67616d0000b273c5649add07ed3720be9d5526ab67616d0000b273e71dd15fc5bdefd5bff70452ab67616d0000b273f11f1c4ad183b7fa625f8534',
        width: 60
      }
    ],
    name: 'Hi',
    owner: {
      display_name: 'Nikhil Patel',
      external_urls: {
        spotify: 'https://open.spotify.com/user/217lrmojbxm6rs62qttjjnv4i'
      },
      href: 'https://api.spotify.com/v1/users/217lrmojbxm6rs62qttjjnv4i',
      id: '217lrmojbxm6rs62qttjjnv4i',
      type: 'user',
      uri: 'spotify:user:217lrmojbxm6rs62qttjjnv4i'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MjAsZDI3NzAwZjFkMzMwMDljN2FiOGViOGYwYWIxMjMzZTliZTFhZGRlZg==',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/0cy9nTPd3wrMoIcYwVSPGX/tracks',
      total: 19
    },
    type: 'playlist',
    uri: 'spotify:playlist:0cy9nTPd3wrMoIcYwVSPGX'
  },
  {
    collaborative: false,
    description: 'Get to know the shape-shifting, forward thinking, the one and only, Frank Ocean.',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1DXdyjMX5o2vCq'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXdyjMX5o2vCq',
    id: '37i9dQZF1DXdyjMX5o2vCq',
    images: [
      {
        height: null,
        url: 'https://i.scdn.co/image/ab67706f000000038956422a2c850689bf00bde8',
        width: null
      }
    ],
    name: 'This Is Frank Ocean',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MTU5MDA0MjY1OCwwMDAwMDAwODAwMDAwMTcyMzVlZDg2MTkwMDAwMDE3MGFmNDM3MWZk',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXdyjMX5o2vCq/tracks',
      total: 47
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1DXdyjMX5o2vCq'
  },
  {
    collaborative: false,
    description: 'Genre-less. Quality first always. Cover: Gabriel Garzón-Montano',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1DWWBHeXOYZf74'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DWWBHeXOYZf74',
    id: '37i9dQZF1DWWBHeXOYZf74',
    images: [
      {
        height: null,
        url: 'https://i.scdn.co/image/ab67706f00000003699714c269d81e2bb7d80a02',
        width: null
      }
    ],
    name: 'POLLEN',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MTYwMTQwMjQ3NywwMDAwMDJkNTAwMDAwMTc0ZGIwNjljOTIwMDAwMDE3NGIyYWMxZmNm',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DWWBHeXOYZf74/tracks',
      total: 176
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1DWWBHeXOYZf74'
  },
  {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1E4Eo1x67VwxoH'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E4Eo1x67VwxoH',
    id: '37i9dQZF1E4Eo1x67VwxoH',
    images: [
      {
        height: null,
        url: 'https://seeded-session-images.scdn.co/v1/img/artist/3nFkdlSjzX9mRTtwJOzDYB/en',
        width: null
      }
    ],
    name: 'JAY-Z Radio',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MjY2OTE1ODYsMDAwMDAwMDA2YjdmNjE3NzIyNjk3MTMwYzk5MTcyYWQ4M2M3MTZmZg==',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1E4Eo1x67VwxoH/tracks',
      total: 50
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1E4Eo1x67VwxoH'
  },
  {
    collaborative: false,
    description: 'Written By Noah Goldstein. The essential songs, all in one playlist. Learn more <a href="https://artists.spotify.com/songwriter/10y7JchLTvoqjb3FZqnDAn">here</a>.',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1EFAown3RRmufu'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EFAown3RRmufu',
    id: '37i9dQZF1EFAown3RRmufu',
    images: [
      {
        height: null,
        url: 'https://i.scdn.co/image/ab67706f000000038bfd64eec88886f532b6df8f',
        width: null
      }
    ],
    name: 'Written By Noah Goldstein',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MjY2OTE1ODYsMDAwMDAwMDBjMzAxNDQxNTExMmMyYTY1YmY4ZDBjZjQ0NzI5ZWZlMw==',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EFAown3RRmufu/tracks',
      total: 50
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1EFAown3RRmufu'
  },
  {
    collaborative: false,
    description: 'A trip down pop\'s memory lane.',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1DX4v0Y84QklHD'
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX4v0Y84QklHD',
    id: '37i9dQZF1DX4v0Y84QklHD',
    images: [
      {
        height: null,
        url: 'https://i.scdn.co/image/ab67706f000000039a301b01b8ececc2159108eb',
        width: null
      }
    ],
    name: 'Classic Pop Picks',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify'
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MTYwMTQ5NTE3MiwwMDAwMDAwMGQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0Mjdl',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX4v0Y84QklHD/tracks',
      total: 50
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1DX4v0Y84QklHD'
  },
  {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/1SbbpezIgnSc4iDp4ckpef'
    },
    href: 'https://api.spotify.com/v1/playlists/1SbbpezIgnSc4iDp4ckpef',
    id: '1SbbpezIgnSc4iDp4ckpef',
    images: [
      {
        height: 640,
        url: 'https://mosaic.scdn.co/640/ab67616d0000b2731e9a057052d59004caf47e22ab67616d0000b2736b18d0490878750cd69abf2cab67616d0000b2739e2f95ae77cf436017ada9cbab67616d0000b273e14f11f796cef9f9a82691a7',
        width: 640
      },
      {
        height: 300,
        url: 'https://mosaic.scdn.co/300/ab67616d0000b2731e9a057052d59004caf47e22ab67616d0000b2736b18d0490878750cd69abf2cab67616d0000b2739e2f95ae77cf436017ada9cbab67616d0000b273e14f11f796cef9f9a82691a7',
        width: 300
      },
      {
        height: 60,
        url: 'https://mosaic.scdn.co/60/ab67616d0000b2731e9a057052d59004caf47e22ab67616d0000b2736b18d0490878750cd69abf2cab67616d0000b2739e2f95ae77cf436017ada9cbab67616d0000b273e14f11f796cef9f9a82691a7',
        width: 60
      }
    ],
    name: 'Now 70 - 99',
    owner: {
      display_name: 'Daniel Wolf Man Stainer',
      external_urls: {
        spotify: 'https://open.spotify.com/user/1177956055'
      },
      href: 'https://api.spotify.com/v1/users/1177956055',
      id: '1177956055',
      type: 'user',
      uri: 'spotify:user:1177956055'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MTE0LGY3YmY0NjY0YTBkOTdlZmMxNWQxYTEyNTc5ZDZkZmRiMzQ3YTExNjU=',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/1SbbpezIgnSc4iDp4ckpef/tracks',
      total: 1235
    },
    type: 'playlist',
    uri: 'spotify:playlist:1SbbpezIgnSc4iDp4ckpef'
  },
  {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/0bL1xOv49B9IR5UaTl441x'
    },
    href: 'https://api.spotify.com/v1/playlists/0bL1xOv49B9IR5UaTl441x',
    id: '0bL1xOv49B9IR5UaTl441x',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f',
        width: 640
      }
    ],
    name: 'Liked from Radio',
    owner: {
      display_name: 'Nikhil Patel',
      external_urls: {
        spotify: 'https://open.spotify.com/user/217lrmojbxm6rs62qttjjnv4i'
      },
      href: 'https://api.spotify.com/v1/users/217lrmojbxm6rs62qttjjnv4i',
      id: '217lrmojbxm6rs62qttjjnv4i',
      type: 'user',
      uri: 'spotify:user:217lrmojbxm6rs62qttjjnv4i'
    },
    primary_color: null,
    public: false,
    snapshot_id: 'MixkM2M5MGM3NzgzMzJlZTRkMGZkM2RkYjA3NzdhODhmY2JiZjZjZjk4',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/0bL1xOv49B9IR5UaTl441x/tracks',
      total: 1
    },
    type: 'playlist',
    uri: 'spotify:playlist:0bL1xOv49B9IR5UaTl441x'
  }
];
