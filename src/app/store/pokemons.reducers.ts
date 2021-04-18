import { Action, createReducer, on } from '@ngrx/store';

import { generation1$ } from './pokemons.actions';

export const initialState = 0;

const COUNTER_REDUCER = createReducer(
  initialState,
  on(generation1$, (state) => state + 1),
);

export function counterReducer(state: number, action: Action) {
  return COUNTER_REDUCER(state, action);
}
