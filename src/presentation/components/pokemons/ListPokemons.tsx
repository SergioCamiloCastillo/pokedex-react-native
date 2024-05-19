import React from 'react';
import {PokemonEntity} from '../../../domain/entities/pokemon';
import {InfiniteData} from '@tanstack/react-query';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text} from 'react-native-paper';
import {PokemonCard} from './PokemonCard';
interface Props {
  data?: InfiniteData<PokemonEntity[]> | undefined;
  fetchNextPage?: () => void;
  onlyPokemonsArray?: PokemonEntity[];
}
export const ListPokemons = ({
  data,
  fetchNextPage,
  onlyPokemonsArray,
}: Props) => {
  const {top} = useSafeAreaInsets();
  return (
    <FlatList
      data={onlyPokemonsArray ? onlyPokemonsArray : data?.pages.flat() ?? []}
      keyExtractor={(pokemon: PokemonEntity, index) => `${pokemon.id}-${index}`}
      style={{paddingTop: top + 20}}
      numColumns={2}
      ListHeaderComponent={() => <Text variant="displayMedium">Pokedex</Text>}
      renderItem={({item}) => <PokemonCard pokemon={item} />}
      onEndReachedThreshold={fetchNextPage ? 0.7 : 0}
      onEndReached={() => (fetchNextPage ? fetchNextPage() : null)}
    />
  );
};
