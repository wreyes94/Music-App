import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageHelper} from '../helpers/storage.helper';


@Component({
  selector: 'app-social-followers',
  templateUrl: './social-followers.component.html',
  styleUrls: ['./social-followers.component.scss']
})

export class SocialFollowersComponent implements OnInit {
  public artistName = '';
  public accessToken = '';
  public startDate = 0;
  public endDate = 0;
  public metrics = 0;
  public secondMetrics = 0;
  public thirdMetrics = 0;
  public threeValArray = [];
  public artistId = 0;
  public currentArtist: any = [];
  public totalFollowers = 0;
  public allSocialMedia: any = [];

  constructor(private httpClient: HttpClient) {
  }

  async ngOnInit() {
    this.accessToken = StorageHelper.getLocal('accessToken');
    this.artistName = StorageHelper.getLocal('artistName');
    this.artistId = StorageHelper.getLocal('artistId');
    this.metricApi();
  }

  metricApi() {
    this.metrics = 28; // twitter follows
    this.secondMetrics = 41; // Songkick Followers
    this.thirdMetrics = 405; // wikipedia views
    this.startDate = 17167;
    this.endDate = 17531;
    this.secondMetrics = 247; // twitter mentions
    this.threeValArray = [this.metrics, this.secondMetrics, this.thirdMetrics];

    for (let i = 0; i < this.threeValArray.length; i++) {
      this.httpClient.get(`https://api.nextbigsound.com/artists/${this.artistId}/data?metricIds=${this.threeValArray[i]}&startDate=2017-01-01&endDate=2017-12-31&timeseries=totals,deltas&access_token=${this.accessToken}`)
        .subscribe(
          (data: any[]) => {
            this.currentArtist = data;
            this.currentArtist = this.currentArtist.data[0].timeseries.deltas;
            const firstData = Object.values(this.currentArtist);
            const newArray = firstData.concat();
            for (let index = 0; index < newArray.length; index++) {
              // this.totalFollowers = this.totalFollowers + newArray[index];
              this.totalFollowers = this.totalFollowers + +newArray[index];
            }
            this.allSocialMedia.push(this.totalFollowers);
            this.totalFollowers = 0;
          }
        );
    }
    setTimeout(() => {
      this.showBars();
    }, 1000);
  }

  public showBars() {
    const width = 500;
    const height = 300;

    // @ts-ignore
    const widthScale = d3.scaleLinear()
    // .domain([d3.min(this.allSocialMedia), d3.max(this.allSocialMedia)])
      .domain([0, d3.max(this.allSocialMedia)])
      .range([0, width - 100]);

    // @ts-ignore
    const color = d3.scaleLinear()
      .domain([0, d3.max(this.allSocialMedia)])
      .range(['red', 'blue']);

    // @ts-ignore
    const axis = d3.axisBottom()
      .ticks(5)
      .scale(widthScale);

    const canvas = d3.select('#fullChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(50, 50)');


    const bars = canvas.selectAll('rect')
      .data(this.allSocialMedia)
      .enter()
      .append('rect')
      .attr('width', function (d) {
        return widthScale(d);
      })
      .attr('height', 40)
      .attr('fill', function (d) {
        return color(d);
      })
      .attr('y', function (d, i) {
        return i * 60;
      });
    const xAxisTranslate = height / 2 + 10;

    canvas.append('g')
      .attr('transform', 'translate(0, ' + xAxisTranslate + ')')
      .call(axis);

  }

  refreshPageValues() {
    this.metricApi();
  }
}

