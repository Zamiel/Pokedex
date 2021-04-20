import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { SimpleChange } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { Observable, of } from 'rxjs';

import { PokedexApiService } from '../../../../services/pokedex-api.service';
import { IPokemon } from '../../../../services/pokemon';
import { ListCardComponent } from './list-card.component';

describe('ListCardComponent', () => {
  let component: ListCardComponent;
  let fixture: ComponentFixture<ListCardComponent>;
  let nativeElement: any;

  const pokedexApiService = {
    fetchPokemonByName(name: string): Observable<IPokemon> {
      return of({
        id: 0, name, abilities: [], order: 0, type: 'normal',
        sprites: { front_default: '', front_shiny: '' },
        stats: { hp: 10, attack: 10, defense: 10, special_attack: 50, special_defense: 50, speed: 100 },
      });
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCardComponent],
      imports: [
        FlexModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: PokedexApiService, useValue: pokedexApiService },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect correctly', () => {
    component.name = 'test';
    fixture.detectChanges();

    const a = nativeElement.querySelector('a');
    const button = nativeElement.querySelector('button');
    const anchorRedirection = a.attributes['ng-reflect-router-link'].value.split(',');
    const buttonRedirection = button.attributes['ng-reflect-router-link'].value.split(',');

    expect(anchorRedirection).toEqual(['/pokemon', 'test']);
    expect(buttonRedirection).toEqual(['/pokemon', 'test']);
  });

  it('should draw the type correctly', () => {
    component.name = 'test';
    component.ngOnChanges({ name: { currentValue: 'test' } as SimpleChange });
    fixture.detectChanges();

    const img = nativeElement.querySelector('img');
    expect(img.src).toContain('normal.png');
  });
});
