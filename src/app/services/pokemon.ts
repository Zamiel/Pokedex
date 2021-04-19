export interface INameUrl {
  name: string;
  url: string;
}
export interface ILocalizedAbility {
  description: { [key: string]: string };
  name: { [key: string]: string };
};

export interface ISprites {
  front_default: string;
  front_shiny: string;
}

export interface IPokemonList {
  id: number;
  pokemon_species: INameUrl[];
}

export interface IPokemon {
  id: number;
  abilities: string[];
  name: string;
  order: number;
  sprites: ISprites;
  stats: IPokemonStats;
  type: string;
}

export interface IPokemonStats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}
