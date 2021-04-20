import { TestBed } from '@angular/core/testing';

import { PokemonDetailsResolver } from './pokemon-details.resolver';
import { PokedexApiService } from '../../../services/pokedex-api.service';

describe('PokemonDetailsResolver', () => {
  let resolver: PokemonDetailsResolver;
  let pokedexApiServiceStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PokedexApiService, useValue: pokedexApiServiceStub },
      ],
    });
    resolver = TestBed.inject(PokemonDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
