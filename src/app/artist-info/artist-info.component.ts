import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss']
})

export class ArtistInfoComponent {
  public artistName = '';
  public access_token = 'eb74a82009cbc53c9b44866743633f9d';
  public limit = 0;
  public id = 0;
  public startDate = 0;
  public endDate = 0;
  public metrics = 0;
  public currentArtist: any = [];

  constructor(private httpClient: HttpClient) { }


}


