import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageHelper} from '../helpers/storage.helper';
import {AboutMeComponent } from '../about-me/about-me.component';
import {ArtistEventsComponent} from '../artist-events/artist-events.component';
import {SocialFollowersComponent} from '../social-followers/social-followers.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public artistName = '';
  public access_token = '';
  public limit = 10;
  public artistId = 0;
  public currentArtist: any = [];

  constructor(private httpClient: HttpClient,
) { }

  async ngOnInit() {
    StorageHelper.setLocal('accessToken', 'eb74a82009cbc53c9b44866743633f9d');
    StorageHelper.setLocal('refreshPage', false);
    this.access_token = StorageHelper.getLocal<string>('accessToken');
  }

   saveArtistName(event: any) {
    let tempName = '';
    let tempArray = [];
    tempName = event.target.value.toLowerCase();
    tempArray = tempName.split(' ');
    this.artistName = JSON.stringify(tempArray.join('+'));
  }

  getArtistInformation() {
    this.httpClient.get(`https://api.nextbigsound.com/search/v1/artists/?query=${this.artistName}&limit=${this.limit}&access_token=${this.access_token}\n`)
      .subscribe(
        (data: any[]) => {
          this.currentArtist = data;
          StorageHelper.setLocal('artistName', this.artistName);
          StorageHelper.setLocal('artistId', this.currentArtist.artists[0].id);
          document.location.href = './artistInfo';
          // StorageHelper.setLocal('refreshPage', true);
          // this.aboutMe.refreshPageValues();
          // this.artistEvents.refreshPageValues();
          // this.socialFollowers.refreshPageValues();
        }
      );
  }
}


