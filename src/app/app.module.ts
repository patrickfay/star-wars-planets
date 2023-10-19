import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlanetCardComponent } from './components/planet-card/planet-card.component';
import { PlanetsService } from './services/planets.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    PlanetCardComponent
  ],
  providers: [PlanetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
