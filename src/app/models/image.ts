import {Track} from './track';

export class Image {
  width: number;
  height: number;
  url: string;

  // constructor(private height: number, private width: number, private url: string) {
  //   this.height = height;
  //   this.width = width;
  //   this.url = url;
  // }

  resizeImage(dim): void {
    this.width = dim;
    this.height = dim;
  }

}
