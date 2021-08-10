import {Track} from './track';
import * as IJS from 'image-js';

export class Image {
  width: number;
  height: number;
  url: string;
  picture: IJS.Image;


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
