import {HttpClient} from '@angular/common/http';
import {StorageHelper} from '../helpers/storage.helper';
import * as d3 from 'd3';
import { Component, AfterContentInit, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  public artistName = '';
  public accessToken = 'eb74a82009cbc53c9b44866743633f9d';
  public limit = 10;
  public startDate = 0;
  public endDate = 0;
  public currentArtist: any = [];
  public artistId = 0;
  public secondMetrics = 0;
  public activeName: '';
  public activeImage: '';
  public refreshPage = false;

  constructor(private httpClient: HttpClient) {
  }

  async ngOnInit() {
    this.accessToken = StorageHelper.getLocal('accessToken');
    this.artistName = StorageHelper.getLocal('artistName');
    this.refreshPage = StorageHelper.getLocal('refreshPage');
    this.metricApi();
  }

  metricApi() {
    this.startDate = 17167;
    this.endDate = 17531;
    this.artistId = 356;
    this.secondMetrics = 247; // twitter mentions

    this.httpClient.get(`https://api.nextbigsound.com/search/v1/artists/?query=${this.artistName}&limit=${this.limit}&access_token=${this.accessToken}\n`)
      .subscribe(
        (data: any[]) => {
          this.currentArtist = data;
          this.activeName = this.currentArtist.artists[0].name;
          this.activeImage = this.currentArtist.artists[0].images[0].original;
        }
      );
    }

    refreshPageValues() {
        this.metricApi();
    }
}
