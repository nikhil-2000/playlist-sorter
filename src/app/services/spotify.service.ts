import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as querystring from 'querystring';
import {environment} from '../../environments/environment.prod';
import {DefaultUrlSerializer} from '@angular/router';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable, Subscription} from 'rxjs';
import {Playlist} from '../models/playlist';
import {Track} from '../models/track';
import {concatMap, subscribeOn} from 'rxjs/operators';
import {User} from '../models/user';
import { merge } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class SpotifyService {

  tokens: TokenResponse = {
    access_token: '',
    refresh_token: ''
  };

  user: User;

  chosenPlaylist: Playlist;


  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private router: Router) {
  }

  rerouteIfLoggedIn(): void {
    if (this.getCode() === '') {
    } else if (this.tokens.access_token === '') {
      this.getAccessToken().pipe(concatMap(tokens => {
        this.tokens = tokens;
        return this.getUser();
      })).subscribe(data => {
          this.user = new User(data);
        }
      );
    }
  }

  getCode(): string {
    const parser = new DefaultUrlSerializer();
    const code = parser.parse(window.location.search).queryParamMap.get('code');
    return code == null ? '' : code;
  }

  getStandardHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.tokens.access_token);
    return headers;
  }

  getAccessToken(): Observable<TokenResponse> {
    const code = this.getCode();
    const query = 'https://accounts.spotify.com/api/token';
    const body = querystring.stringify({
      code,
      redirect_uri: this.authService.redirectURI,
      grant_type: 'authorization_code'
    });
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(environment.clientId + ':' + environment.clientSecret));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<TokenResponse>(query, body, {headers});

  }


  getUser(): Observable<any>{
    const query = 'https://api.spotify.com/v1/me';
    return this.http.get(query, {headers: this.getStandardHeader()});
  }

  getUserPlaylists(limit: number, offset: number): Observable<any> {
    const query = 'https://api.spotify.com/v1/me/playlists?limit=' + limit.toString() + '&offset=' + offset.toString();
    return this.http.get(query, {headers: this.getStandardHeader()});
  }

  getUserLibrary(): Observable<any> {
    const query = 'https://api.spotify.com/v1/me/tracks';
    return this.http.get(query, {headers: this.getStandardHeader()});
  }

  getTracks(playlist: Playlist, limit: number, offset: number): Observable<any> {
    const query = 'https://api.spotify.com/v1/playlists/' + playlist.getId() + '/tracks?offset=' + offset.toString() + '&limit=' + limit.toString();
    return this.http.get(query, {headers: this.getStandardHeader()});
  }

  getTrackFeatures(track: Track): Observable<any> {
    const query = 'https://api.spotify.com/v1/audio-features/' + track.id;
    return this.http.get(query, {headers: this.getStandardHeader()});
  }

  getMultipleTrackFeatures(tracks: Array<Track>): Observable<any> {
    let query = 'https://api.spotify.com/v1/audio-features?ids=';
    const ids = tracks.map(t => t.id);
    query = query + ids.join('%2C');
    return this.http.get(query, {headers: this.getStandardHeader()});
  }

  search(term: string, type: string): Observable<any> {
    const termNoSpaces = term.replace(' ', '+');
    const query = 'https://api.spotify.com/v1/search?q=' + termNoSpaces + '&type=' + type;
    return this.http.get(query, {headers: this.getStandardHeader()});
  }

  addTracksToPlaylist(playlist: Playlist, tracks: Array<Track>): Observable<any> {
    const addSongsInOrder = 'https://api.spotify.com/v1/playlists/' + playlist.getId() + '/tracks';
    const uriListLength = 80;
    let requests = new Array<Observable<any>>();
    let i, temporary, body, req;
    for (i = 0; i < tracks.length; i += uriListLength) {
      console.log('Adding Tracks');
      temporary = tracks.slice(i, i + uriListLength);
      body = {
        uris: temporary.map(t => t.uri),
      };
      req = this.http.post(addSongsInOrder, body, {headers: this.getStandardHeader()});
      requests.push(req);
    }

    return merge(requests);
  }

  createNewPlaylist(method: string, tracks: Array<Track>, playlist: Playlist): void {
//   firstPOSTCallToAPI('url', data).pipe(
//     concatMap(result1 => secondPOSTCallToAPI('url', result1))
//   concatMap( result2 => thirdPOSTCallToAPI('url', result2))
//   concatMap(result3 => fourthPOSTCallToAPI('url', result3))
// ....
// ).subscribe(
//     success => { /* display success msg */ },
// errorData => { /* display error msg */ }
// );
    const createNewPlaylist = 'https://api.spotify.com/v1/users/' + this.user.getId() + '/playlists';
    const body = {
      name: playlist.getName() + ' Sortified',
      description: playlist.getName() + ' is sorted by ' + method,
      public: false
    };


    this.http.post(createNewPlaylist, body, {headers: this.getStandardHeader()}).pipe(
      concatMap(newPlaylistData => {
        const newPlaylist = new Playlist(newPlaylistData);
        return this.addTracksToPlaylist(newPlaylist, tracks);
      })
    ).subscribe(requests => {
        requests.forEach(r => console.log(r));
    });


  }
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
