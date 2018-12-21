import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './home-page/homepage.component';
import { ArtistInfoComponent } from './artist-info/artist-info.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ArtistEventsComponent } from './artist-events/artist-events.component';
import { SocialFollowersComponent } from './social-followers/social-followers.component';

import { NvD3Module } from 'ng2-nvd3';


// import { O2ChartComponent, ChartConst } from 'o2-chart-lib';
const configRoutes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'homepage/**', redirectTo: 'homepage' },
  { path: 'artistInfo', component: ArtistInfoComponent},
  { path: 'artistInfo/**', redirectTo: 'artistInfo'},
  { path: '**', redirectTo: 'homepage' },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    ArtistInfoComponent,
    AboutMeComponent,
    ArtistEventsComponent,
    SocialFollowersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NvD3Module,
    RouterModule.forRoot(configRoutes),

  ],
  exports: [
    HeaderComponent,
    HomepageComponent,
    ArtistInfoComponent,
    AboutMeComponent,
    ArtistEventsComponent,
    SocialFollowersComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

