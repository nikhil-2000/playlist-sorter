import { Image } from './image';

export class Playlist {

  constructor(private name: string, private image: Image, private tracks: any) {
    this.name = name;
    this.image = image;
    this.tracks = tracks;
  }

  getName(): string {
    return this.name;
  }

  getImage(): Image {
    return this.image;
  }

  setImage(image): void {
    this.image = image;
  }

  getTracks(): any {
    return this.tracks;
  }
}
