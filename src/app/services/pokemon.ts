export interface INameUrl {
  name: string;
  url: string;
}

export interface IAbility {
  ability: INameUrl;
  is_hidden: boolean;
  slot: number;
}

export interface ISprites {
  front_default: string;
  front_shiny: string;
}

export interface IPokemonList {
  id: number;
  pokemon_species: Array<INameUrl>;
}

export interface IPokemonType {
  slot: number;
  type: INameUrl;
}

export interface IPokemon {
  id: number;
  abilities: Array<IAbility>;
  name: string;
  order: number;
  sprites: ISprites;
  types: Array<IPokemonType>;
}
