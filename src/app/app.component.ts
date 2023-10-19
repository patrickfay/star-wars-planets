import { Component, OnInit } from '@angular/core';
import { PlanetsService } from './services/planets.service';
import { Planet } from './constants/planet.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public planets: Planet[] = [];

  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {
    this.planetsService.getPlanets().subscribe({
      // TODO - uncomment out and remove console.log
      // next: planetsResponse => this.planets = planetsResponse
      next: planetsResponse => {
        this.planets = planetsResponse;
        console.log('PLANETS', planetsResponse);
      }
    });
  }
}
