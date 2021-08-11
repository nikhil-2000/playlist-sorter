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
import {concatMap} from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})

export class SpotifyService {

  tokens: TokenResponse = {
    access_token: '',
    refresh_token: ''
  };

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
      })).subscribe(data => console.log(data));
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

  createNewPlaylist(method: string, tracks: Array<Track>, playlist_id: string): void {
//   firstPOSTCallToAPI('url', data).pipe(
//     concatMap(result1 => secondPOSTCallToAPI('url', result1))
//   concatMap( result2 => thirdPOSTCallToAPI('url', result2))
//   concatMap(result3 => fourthPOSTCallToAPI('url', result3))
// ....
// ).subscribe(
//     success => { /* display success msg */ },
// errorData => { /* display error msg */ }
// );
    const createNewPlaylist = 'https://api.spotify.com/v1/users/{user_id}/playlists';
    const addSongsInOrder = 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks';

  }
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}


// {
//   "access_token": "BQCPJwkDgEJo1UpikkaOCycpBv29wynmJpKLfJRnA24AJl96vLM_4MH1FGcI3c5T_LFa27riMSmL4zx6r_gPnhIKRWIlkfoOH8Cw1lRHbpRLhVCtseUkwd899IfYuGNJHUj-Fjdfyy3f0PwZ3H4y2KNZEpH47T6xhGAVg89Ffd--vu2952hanQ",
//   "token_type": "Bearer",
//   "expires_in": 3600,
//   "refresh_token": "AQB7iHKWj-6unvKmyTTxmE8QxgbYYyL1UfE9RSFe8w7Ki6empiESe28Itd_-GoJRaseg1DZPhumV-m064GjUA3MOLPwxKy3N78rk48fx-gJH0WRatBBrIbk-YYUP7AySAts",
//   "scope": "playlist-read-private playlist-read-collaborative"
// }
