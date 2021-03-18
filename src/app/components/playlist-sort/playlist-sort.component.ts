import {Component, Output, Input, OnInit, EventEmitter} from '@angular/core';
import {Playlist} from '../../models/playlist';
import {Image} from '../../models/image';

@Component({
  selector: 'app-playlist-sort',
  templateUrl: './playlist-sort.component.html',
  styleUrls: ['./playlist-sort.component.css']
})


export class PlaylistSortComponent implements OnInit {
  @Input() playlist: Playlist;
  @Output() methodEmitter = new EventEmitter<string>();
  @Output() orderEmitter = new EventEmitter<boolean>();

  sortingMethod: string;
  methods: string[] = ['Colour', 'Danceability', 'Popularity', 'Tempo'];

  isAscending: boolean;



  constructor() { }

  ngOnInit(): void {
    if (this.playlist.getImage() == null){
      const img = new Image();
      img.url = 'assets/no_playlist_image.png';
      this.playlist.setImage(img);
    }
  }

  updateMethod(method: string): void {
    this.methodEmitter.emit(method);
  }

  updateOrder(order: boolean): void {
    this.orderEmitter.emit(order);
  }
}
