import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable, of } from 'rxjs';

import { MockAbilityComponent } from '../../../../../test/components/mock-ability.component';
import { PokedexApiService } from '../../../../services/pokedex-api.service';
import { ILocalizedAbility } from '../../../../services/pokemon';
import { AbilitiesComponent } from './abilities.component';

describe('AbilitiesComponent', () => {
  let component: AbilitiesComponent;
  let fixture: ComponentFixture<AbilitiesComponent>;
  let nativeElement: any;

  const pokedexApiService = {
    fetchAbilitiesLocalization(args: string[]): Observable<ILocalizedAbility[]> {
      const toReturn = args.map(
        (id) => ({
          description: { fr: `${ id }-description-fr`, en: `${ id }-description-en` },
          name: { fr: `${ id }-name-fr`, en: `${ id }-name-en` },
        }));

      return of(toReturn);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AbilitiesComponent,
        MockAbilityComponent,
      ],
      imports: [
        MatCardModule,
      ],
      providers: [
        { provide: PokedexApiService, useValue: pokedexApiService },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilitiesComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw abilities correctly', async () => {
    const abilityNames = ['test1', 'test2', 'test3'];
    component.abilityNames = abilityNames;
    component.ngOnChanges({ abilityNames: { currentValue: abilityNames } as SimpleChange });
    await fixture.detectChanges();

    const list = await nativeElement.querySelectorAll('app-ability');
    expect(list.length).toEqual(abilityNames.length);
  });
});
