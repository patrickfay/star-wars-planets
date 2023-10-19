import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Planet, PlanetResident } from '../../models/planet.model';
import { PlanetsService } from '../../services/planets.service';

@Component({
  selector: 'sw-planet-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.scss']
})
export class PlanetCardComponent {
  @Input() planet!: Planet;
  public planetResidents?: PlanetResident[];

  constructor(private planetsService: PlanetsService) {}

  /**
   * Gets the residents for this planet card's planet and sets them to this.planetResidents
   * This will display the planet's residents in the UI
   */
  public getPlanetResidents(): void {
    this.planetsService.fetchPlanetResidents(this.planet.residents).subscribe({
      next: residents => this.planetResidents = residents
    });
  }
}
