//  pokemon/ditto, pokemon/1, type/3, ability/4, or pokemon?limit=100&offset=200.

export class ApiSettings {
  public static API_URL = 'https://pokeapi.co/api/v2';
  public static MAX_RETRY = 5;
  public static POKEMON_ENDPOINT = '/pokemon/{id}';
}
