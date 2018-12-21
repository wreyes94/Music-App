import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageHelper} from '../helpers/storage.helper';

@Component({
  selector: 'app-artist-events',
  templateUrl: './artist-events.component.html',
  styleUrls: ['./artist-events.component.scss']
})

export class ArtistEventsComponent implements OnInit {
  public artistName = '';
  public access_token = 'eb74a82009cbc53c9b44866743633f9d';
  public artistId = 0;
  public startDate = 0;
  public endDate = 0;
  public currentArtist: any = [];
  public eventDates: any = [];

  constructor(private httpClient: HttpClient) {
  }


  async ngOnInit() {
    this.access_token = StorageHelper.getLocal<string>('accessToken');
    this.artistName = StorageHelper.getLocal('artistName');
    this.artistId = StorageHelper.getLocal('artistId');
    this.getArtistEvents();
  }

  getArtistEvents() {
    this.startDate = 17167;
    this.endDate = 17531;
    this.httpClient.get(`https://api.nextbigsound.com/events/v1/entity/${this.artistId}?start=${this.startDate}&end=${this.endDate}&access_token=${this.access_token}\n`)
      .subscribe(
        (data: any[]) => {
          this.currentArtist = data;
          const firstData = Object.values(this.currentArtist);
          for (let i = 0; i < firstData.length; i++) {
            // @ts-ignore
            this.currentArtist = firstData[i].date;
            this.eventDates.push(this.currentArtist);
          }
        }
      );
  }
}



