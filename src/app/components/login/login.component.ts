import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public spotifyService: SpotifyService, public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.spotifyService.rerouteIfLoggedIn();
    console.log(this.authService.redirectURI);
  }

  login(): void{
    this.authService.getAuthToken();
  }

  isLoggedIn(): boolean{
    return !(this.spotifyService.tokens.access_token === '');
  }

  nextPage(): void {
    this.router.navigate(['/choose-playlist']);
  }

  check(): void{
    console.log(this.spotifyService.tokens);
  }
}
