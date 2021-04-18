import { TestBed } from '@angular/core/testing';

import { PokemonListResolver } from './pokemon-list.resolver';

describe('PokemonListResolver', () => {
  let resolver: PokemonListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PokemonListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
