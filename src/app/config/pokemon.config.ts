import { IPokemonStats } from '../services/pokemon';

const FIRST_GENERATION_POKEMON_MAX_STATS: IPokemonStats = {
  hp: 255,
  attack: 134,
  defense: 230,
  special_attack: 154,
  special_defense: 230,
  speed: 140,
};

function getStatByKey(stats: IPokemonStats, key: string = ''): number {
  return stats[key.replace(/-/g, '_') as keyof IPokemonStats];
}

function getMaxStatByKey(key: string = ''): number {
  return FIRST_GENERATION_POKEMON_MAX_STATS[key.replace(/-/g, '_') as keyof IPokemonStats];
}

function mapStatToPokemonStat(args: any[]): IPokemonStats {
  const stats: any = {};

  args.map((arg: any) => {
    const key = arg.stat.name.replace(/-/g, '_');
    stats[key as keyof IPokemonStats] = arg.base_stat;
  });

  return stats as IPokemonStats;
}

export {
  FIRST_GENERATION_POKEMON_MAX_STATS, getStatByKey, getMaxStatByKey, mapStatToPokemonStat,
};
