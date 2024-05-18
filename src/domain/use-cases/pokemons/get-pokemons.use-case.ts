import {pokeApi} from '../../../config/api/pokeApi';
import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../../infrastructure/interfaces/pokeApi.interfaces';
import {PokemonMapper} from '../../../infrastructure/mappers/pokemon.mapper';
import type {PokemonEntity} from '../../entities/pokemon';

export const getPokemonsUseCase = async (
  page: number,
  limit: number = 20,
): Promise<PokemonEntity[]> => {
  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url);
    const pokemonPromises = data.results.map(item => {
      return pokeApi.get<PokeAPIPokemon>(item.url);
    });
    
    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemonsPromises = pokeApiPokemons.map(item =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );

    return await Promise.all(pokemonsPromises);
  } catch (error) {
    throw new Error('Error fetching pokemons');
  }
};
