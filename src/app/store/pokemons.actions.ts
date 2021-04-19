import { createAction, props } from '@ngrx/store';
import { IPokemon } from '../services/pokemon';

export const addPokemon = createAction(
  'POKEMONS.ACTIONS.ADD_POKEMON',
  props<{ pokemon: IPokemon }>(),
);
