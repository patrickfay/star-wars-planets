import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PlanetCardComponent } from './planet-card.component';

describe('PlanetCardComponent', () => {
  let component: PlanetCardComponent;
  let fixture: ComponentFixture<PlanetCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlanetCardComponent, HttpClientModule],
    });
    fixture = TestBed.createComponent(PlanetCardComponent);
    component = fixture.componentInstance;
    component.planet = {
      name: 'test',
      climate: 'cold',
      diameter: '1000',
      gravity: '2',
      population: '10',
      residents: ['fake/api']
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
