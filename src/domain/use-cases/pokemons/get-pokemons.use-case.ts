import {pokeApi} from '../../../config/api/pokeApi';
import {PokemonEntity} from '../../entities/pokemon';

export const getPokemonsUseCase = async (): Promise<PokemonEntity[]> => {
  try {
    const url = '/pokemonssssss';
    const {data} = await pokeApi.get(url);
    return [];
  } catch (error) {
    throw new Error('Error fetching pokemons');
  }
};
