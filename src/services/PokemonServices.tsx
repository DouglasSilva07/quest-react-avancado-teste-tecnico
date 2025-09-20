import { api } from './api';
import type { PokemonInfo } from '../tipos/tipos';

export async function getMultiplePokemon(limit: number, offset: number): Promise<PokemonInfo[]> {
  const response = await api.get(`api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const results = response.data.results;
  console.log('Offset:', offset, 'Nomes:', results.map(r => r.name));

  const promises = results.map(async (pokemon: { name: string }) => {
    const res = await api.get(`api/v2/pokemon/${pokemon.name}`);
    const data = res.data;

    return {
      name: data.name,
      image: data.sprites.front_default
    };
  });

  return Promise.all(promises);
}

export async function getPokemonByName(name: string): Promise<PokemonInfo> {
  const solution = await api.get(`api/v2/pokemon/${name}`);
  const dat = solution.data;

  return {
    name: dat.name,
    image: dat.sprites.front_default,
    types: dat.types.map((t: any) => t.type.name),
    skills: dat.abilities.map((a: any) => a.ability.name),
    moves: dat.moves.map((m: any) => m.move.name) // Corrigido de 'movies' para 'moves'
  }
}

export async function getPokemonSearchByName(name: string): Promise<PokemonInfo> {
  const searchName = await api.get(`api/v2/pokemon/${name}`);
  const search = searchName.data;

  return {
    name: search.name,
    image: search.sprites.front_default,
    types: search.types.map((t: any) => t.type.name),
    skills: search.abilities.map((a: any) => a.ability.name),
    moves: search.moves.map((m: any) => m.move.name)
  }
}

export async function getPokemonByType(type: string): Promise<PokemonInfo[]> {
  // 1. Chama o endpoint de tipo
  const searchType = await api.get(`api/v2/type/${type}`);
  const pokemonsOfType = searchType.data.pokemon;

  // 2. Busca detalhes de cada Pokémon em paralelo
  const detailedPokemons = await Promise.all(
    pokemonsOfType.map(async (p: any) => {
      const response = await api.get(p.pokemon.url);
      const data = response.data;

      return {
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),
        skills: data.abilities.map((a: any) => a.ability.name),
        moves: data.moves.map((m: any) => m.move.name),
      };
    })
  );

  return detailedPokemons;
}



