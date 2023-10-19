import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, map } from 'rxjs';

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(private http: HttpClient) {}

  public getPlanets(): Observable<any[]> {
    return this.http.get<ApiResponse<any>>('https://swapi.dev/api/planets/')
      .pipe(
        first(),
        map(planetsResponse => planetsResponse.results)
      );
  }
}