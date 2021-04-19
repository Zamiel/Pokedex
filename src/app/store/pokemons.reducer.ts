import { Action, createReducer, on } from '@ngrx/store';

import { addPokemon } from './pokemons.actions';
import { IPokemon } from '../services/pokemon';

interface IState {
  [key: string]: IPokemon;
}

const initialState: IState = {};
const REDUCER = createReducer(
  initialState,
  on(addPokemon, (state: IState, { pokemon }) => {
    state[pokemon.name] = pokemon;
    return state;
  }),
);

export function pokemonReducer(state: IState | undefined, action: Action) {
  return REDUCER(state, action);
}
