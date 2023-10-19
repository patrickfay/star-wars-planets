import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, first, map, tap } from 'rxjs';
import { Planet } from '../models/planet.model';

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({ providedIn: 'root' })
export class PlanetsService {
  /**
   * We are using 2 be behaviour subjects here to act as stores for the current viewable planets, and
   * if we are waiting for data to be retrieved.
   * 
   * We're leveraging Behaviour subjects because they're easy to use in components and their templates, requiring only logic
   * needed for the retrieving/modifying data in this file.
   */
  private readonly viewablePlanetsApiResp: BehaviorSubject<ApiResponse<Planet> | null>
    = new BehaviorSubject<ApiResponse<Planet> | null>(null);
  private readonly isLoadingPlanetData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  /**
   * Returns the planets that will be viewed in the Planet List.
   * This getter is being used to display the planets in the template.
   */
  public get currentPagePlanets$(): Observable<Planet[]> {
    return this.viewablePlanetsApiResp.asObservable().pipe(map(planetsApiResp => planetsApiResp?.results || [] as unknown as Planet[]));
  }

  /**
   * Returns true if we are waiting for an api response to return planet data, else returns false
   */
  public get isLoading$(): Observable<boolean> {
    return this.isLoadingPlanetData.asObservable();
  }

  /**
   * Fetch Star Wars planets using the provided api url string
   * @param apiStr the api string used to get the list of planets the user wants to see in the planet list
   */
  private fetchPagePlanets(apiStr: string): void {
    this.isLoadingPlanetData.next(true);
    this.http.get<ApiResponse<Planet>>(apiStr)
      .pipe(
        first(),
        tap(planetsApiResponse => {
          // set values for our behaviour subjects
          // anything listening to these observables will be updated with these values
          this.viewablePlanetsApiResp.next(planetsApiResponse);
          this.isLoadingPlanetData.next(false);
        })
      )
      .subscribe();
  }
  /**
   * Fetches the initial list of planets, this is called on app component init
   */
  public fetchInitialPlanets(): void {
    this.fetchPagePlanets('https://swapi.dev/api/planets/');
  }

  /**
   * Fetches next page's planets when the user clicks 'Next' in the Planets List
   */
  public fetchNextPlanetsPage(): void {
    if (this.viewablePlanetsApiResp.value?.next) {
      this.fetchPagePlanets(this.viewablePlanetsApiResp.value.next!);
    }
  }

  /**
   * Fetches previous page's planets when the user clicks 'Previous' in the Planets List
   */
  public fetchPreviousPlanetsPage(): void {
    if (this.viewablePlanetsApiResp.value?.previous) {
      this.fetchPagePlanets(this.viewablePlanetsApiResp.value.previous!);
    }
  }
}