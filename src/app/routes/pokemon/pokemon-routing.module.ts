import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon.component';
import { PokemonListComponent } from './list/pokemon-list.component';
import { PokemonDetailsResolver, PokemonListResolver } from './resolvers';
import { PokemonDetailsComponent } from './details/pokemon-details.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'pokemon',
    component: PokemonComponent,
    children: [
      {
        path: '',
        component: PokemonListComponent,
        resolve: {
          list: PokemonListResolver,
        },
      },
      {
        path: ':pokemonId',
        component: PokemonDetailsComponent,
        resolve: {
          details: PokemonDetailsResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {
}
