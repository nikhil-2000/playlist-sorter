export class Image {
  width: number;
  height: number;
  url: string;

  resizeImage(dim): void {
    this.width = dim;
    this.height = dim;
  }

}
