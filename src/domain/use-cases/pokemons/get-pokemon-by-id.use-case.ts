import {pokeApi} from '../../../config/api/pokeApi';
import {PokeAPIPokemon} from '../../../infrastructure/interfaces/pokeApi.interfaces';
import {PokemonMapper} from '../../../infrastructure/mappers/pokemon.mapper';
import {PokemonEntity} from '../../entities/pokemon';

export const getPokemonByIdUseCase = async (
  id: number,
): Promise<PokemonEntity> => {
  try {
    const {data} = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);
    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);
    return pokemon;
  } catch (error) {
    throw new Error(`Error getting pokemon by id: ${id}`);
  }
};
