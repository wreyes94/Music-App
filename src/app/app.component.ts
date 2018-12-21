import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { StorageHelper } from './helpers/storage.helper';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public homeScreen = true;

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    this.homeScreen = StorageHelper.getLocal<boolean>('homeScreen');
  }

}


