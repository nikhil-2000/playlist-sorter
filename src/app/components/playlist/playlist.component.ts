import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Playlist} from '../../models/playlist';
import {ChoosePlaylistService} from '../../services/choose-playlist.service';
import {Image} from '../../models/image';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist: Playlist;
  // @Input() isSelected: boolean;
  @Input() showButton: boolean;

  @ViewChild('buttonRef', {read: ElementRef}) buttonRef: ElementRef;

  constructor(public choosePlaylistService: ChoosePlaylistService) {
  }

  ngOnInit(): void {
    if (this.playlist.getImage() == null) {
      const img = new Image();
      img.url = 'assets/no_playlist_image.png';
      this.playlist.setImage(img);
    }

  }

  onSelect(): void {
    this.choosePlaylistService.setPlaylist(this.playlist);
    setTimeout(() => this.buttonRef.nativeElement.focus());
  }
}
