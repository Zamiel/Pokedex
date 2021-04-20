import { TestBed } from '@angular/core/testing';

import { PokemonListResolver } from './pokemon-list.resolver';
import { PokedexApiService } from '../../../services/pokedex-api.service';

describe('PokemonListResolver', () => {
  let resolver: PokemonListResolver;
  let pokedexApiServiceStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PokedexApiService, useValue: pokedexApiServiceStub },
      ],
    });
    resolver = TestBed.inject(PokemonListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
