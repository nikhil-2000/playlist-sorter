import { Image } from './image';
import {Track} from './track';

export class Playlist {
  name: string; image: Image; tracks: Array<Track>; id: string;
  constructor(playlistData: any) {
    console.log(playlistData);
    this.name = playlistData.name;
    if (playlistData.images.length > 0) {
      this.image = new Image();
      this.image.url = playlistData.images[0].url;
      this.image.height = playlistData.images[0].height;
      this.image.width = playlistData.images[0].width;
    }else {
      const img = new Image();
      img.url = 'assets/no_playlist_image.png';
      this.setImage(img);
    }

    this.tracks = playlistData.tracks;
    this.id = playlistData.id;
  }

  getName(): string {
    return this.name;
  }

  getImage(): Image {
    return this.image;
  }

  getId(): string {
    return this.id;
  }

  setImage(image): void {
    this.image = image;
  }

  getTracks(): any {
    return this.tracks;
  }
}
