import { Image } from './image';
import { SpotifyService } from '../services/spotify.service';
import {Injectable} from '@angular/core';


export class Track {
  audio;  name;  preview;  popularity;  artists;  album;  image; id; danceability; tempo; href; energy; loudness; valence;

  constructor( private trackObject: any) {
    this.name = trackObject.name;
    this.preview = trackObject.preview;
    this.popularity = trackObject.popularity;
    this.artists = trackObject.artists;
    this.album = trackObject.album;
    this.audio = new Audio(this.preview);
    this.image = new Image();
    this.image.url = trackObject.album.images[0].url;
    this.image.height = trackObject.album.images[0].height;
    this.image.width = trackObject.album.images[0].width;
    this.id = trackObject.id;
    this.href = trackObject.href;
  }

  addAudioFeatures(featuresObject: any): void{
    this.danceability = featuresObject.danceability;
    this.tempo = featuresObject.tempo;
    this.loudness = featuresObject.loudness;
    this.valence = featuresObject.valence;
    this.energy = featuresObject.energy;
    if (featuresObject.tempo === null) {
      console.log('NULL TEMPO' + this.name);
    }
  }

  getName(): string {
    return this.name;
  }

  getPreview(): string {
    return this.preview;
  }

  getPopularity(): number {
    return this.popularity;
  }

  getArtists(): Array<any> {
    return this.artists;
  }

  getAlbum(): any {
    return this.album;
  }

  getImage(): any {
    return this.image;
  }

  getId(): string {
    return this.id;
  }
}

