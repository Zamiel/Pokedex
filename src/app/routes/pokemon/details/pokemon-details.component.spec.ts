import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { MockAbilitiesComponent } from '../../../../test/components/mock-abilities.component';
import { MockSpritesViewerComponent } from '../../../../test/components/mock-sprites-viewer.component';
import { MockStatBarComponent } from '../../../../test/components/mock-stat-bar.component';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let nativeElement: any;

  const details = {
    id: 0, name: 'name', abilities: [], order: 0, type: 'normal',
    sprites: { front_default: '', front_shiny: '' },
    stats: { hp: 10, attack: 10, defense: 10, special_attack: 50, special_defense: 50, speed: 100 },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockAbilitiesComponent,
        MockSpritesViewerComponent,
        MockStatBarComponent,
        PokemonDetailsComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw nothing', async () => {
    component.details = undefined;
    fixture.detectChanges();

    expect(nativeElement.querySelector('app-sprites-viewer')).toBeFalsy();
    expect(nativeElement.querySelector('app-abilities')).toBeFalsy();

    const list = await nativeElement.querySelectorAll('app-stat-bar');
    expect(list.length).toBeFalsy();
  });

  it('should draw the sprites-viewer', () => {
    component.details = details;
    fixture.detectChanges();

    expect(nativeElement.querySelector('app-sprites-viewer')).toBeTruthy();
  });

  it('should draw the abilities', () => {
    component.details = details;
    fixture.detectChanges();

    expect(nativeElement.querySelector('app-abilities')).toBeTruthy();
  });

  it('should draw each stat-bar', async () => {
    component.details = details;
    fixture.detectChanges();

    const list = nativeElement.querySelectorAll('app-stat-bar');
    expect(list.length).toEqual(6);
  });
});
