import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageHelper} from '../helpers/storage.helper';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  public artistName = '';
  public access_token = 'eb74a82009cbc53c9b44866743633f9d';
  public limit = 10;
  public defaultArtists: any = ['kanye+west', 'post+malone', 'travis+scott'];
  public officialNames: any = [];
  public artistInfo: any = [];
  public currentArtist: any = [];
  public imagesArray: any = [];
  public nameArray: any = [];
  public artistIdArray: any = [];

  constructor(private httpClient: HttpClient) {
  }

  async ngOnInit() {
    for (let index = 0; index < this.defaultArtists.length; index++) {
      this.artistName = this.defaultArtists[index];
      this.httpClient.get(`https://api.nextbigsound.com/search/v1/artists/?query=${this.artistName}&limit=${this.limit}&access_token=${this.access_token}\n`)
        .subscribe(
          (data: any[]) => {
            this.currentArtist = data;
            this.artistIdArray.push(this.currentArtist.artists[0].id);
            this.nameArray.push(this.currentArtist.artists[0].name);
            this.currentArtist = this.currentArtist.artists[0].images[0].original;
            this.imagesArray.push(this.currentArtist);
          }
        );
    }
    setTimeout(() => {
      this.settingValues();
    }, 2000);
  }

  settingValues() {
    this.officialNames = [{name: this.nameArray[0], image: this.imagesArray[0], artistId: this.artistIdArray[0]},
      {name: this.nameArray[1], image: this.imagesArray[1], artistId: this.artistIdArray[1]},
      {name: this.nameArray[2], image: this.imagesArray[2], artistId: this.artistIdArray[2]}];
  }

  storeClickInfo(chosenArtist, chosenId) {
    const simpleName = chosenArtist.toLowerCase();
    const tempArray = simpleName.split(' ');
    const regularName = JSON.stringify(tempArray.join('+'));
    StorageHelper.setLocal('artistName', regularName);
    StorageHelper.setLocal('artistId', chosenId);
  }
}


