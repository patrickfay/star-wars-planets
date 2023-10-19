import { Component, OnInit } from '@angular/core';
import { PlanetsService } from './services/planets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public planetsService: PlanetsService) {}

  ngOnInit(): void {
    // fetch and display the initial page's planets
    this.planetsService.fetchInitialPlanets();
  }

  /**
   * Fetch and display the next page's planets
   */
  public viewNextPagesPlanets(): void {
    this.planetsService.fetchNextPlanetsPage();
  }

  /**
   * Fetch and display the previous page's planets
   */
  public viewPreviousPagesPlanets(): void {
    this.planetsService.fetchPreviousPlanetsPage();
  }
}
