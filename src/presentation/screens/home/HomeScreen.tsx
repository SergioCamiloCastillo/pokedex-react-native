import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {getPokemonsUseCase} from '../../../domain/use-cases/pokemons';
import {PokeBallBg} from '../../components/ui/PokeBallBg';
import {PokemonEntity} from '../../../domain/entities/pokemon';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const {isLoading, isError, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async params => {
      const pokemons = await getPokemonsUseCase(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });
      return pokemons;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeBallBg style={styles.imgPosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon: PokemonEntity, index) =>
          `${pokemon.id}-${index}`
        }
        style={{paddingTop: top + 20}}
        numColumns={2}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokedex</Text>}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.7}
        onEndReached={() => fetchNextPage()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {position: 'absolute', top: -100, right: -100},
});
