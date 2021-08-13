
export class User {

  private name;  private href;  private id;  private image;
  constructor( private userObject: any) {
    this.name = userObject.display_name;
    this.image = new Image();
    this.image.url = userObject.images[0].url;
    this.image.height = userObject.images[0].height;
    this.image.width = userObject.images[0].width;
    this.id = userObject.id;
    this.href = userObject.href;
  }

  getName(): string {
    return this.name;
  }

  getHref(): string {
    return this.href;
  }

  getId(): string {
    return this.id;
  }

  getImage(): string {
    return this.image;
  }
}


