import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { Router } from '@angular/router';

import { PokemonComponent } from './pokemon.component';
import { MockPokemonDetailsComponent } from '../../../test/routes/mock-pokemon-details.component';
import { MockPokemonListComponent } from '../../../test/routes/mock-pokemon-list.component';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockPokemonDetailsComponent,
        MockPokemonListComponent,
        PokemonComponent,
      ],
      imports: [
        FlexModule,
        MatCardModule,
        TranslateModule.forRoot({}),
        RouterTestingModule.withRoutes([{
          path: 'pokemon',
          children: [
            { path: '', component: MockPokemonListComponent },
            { path: ':pokemonId', component: MockPokemonDetailsComponent },
          ],
        }]),
      ],
    })
      .compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show pokemon-list without breadcrumbs', fakeAsync(async () => {
    await router.navigate(['pokemon']);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('test')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.pokemon-list')).toBeTruthy();
  }));

  it('should show pokemon-details and breadcrumbs', fakeAsync(async () => {
    await router.navigate(['pokemon', 'test']);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('test')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.pokemon-details')).toBeTruthy();
  }));
});
