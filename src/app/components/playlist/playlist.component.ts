import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Playlist} from '../../models/playlist';
import {ChoosePlaylistService} from '../../services/choose-playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist: Playlist;
  @Input() isSelected: boolean;
  @Input() showButton: boolean;

  @ViewChild('buttonElement') buttonRef: ElementRef;

  constructor(public choosePlaylistService: ChoosePlaylistService) { }

  ngOnInit(): void {
    console.log(this.playlist);
  }

  onSelect(): void {
    this.choosePlaylistService.setPlaylist(this.playlist);
    this.buttonRef.nativeElement.focus();
  }
}
