import {PokemonEntity} from '../../entities/pokemon';
import {getPokemonByIdUseCase} from './get-pokemon-by-id.use-case';

export const getPokemonsByIds = async (
  ids: number[],
): Promise<PokemonEntity[]> => {
  try {
    const pokemonPromises: Promise<PokemonEntity>[] = ids.map(async id => {
      return getPokemonByIdUseCase(id);
    });
    return Promise.all(pokemonPromises);
  } catch (error) {
    throw new Error(`Error getting pokemons with names and ids: ${ids}`);
  }
};
