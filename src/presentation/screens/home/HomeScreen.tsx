import {useQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';
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
  const {
    isLoading,
    isError,
    data: pokemons = [],
  } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemonsUseCase(0),
    staleTime: 1000 * 60 * 60,
  });
  useEffect(() => {
    console.log('ajiiii=>', pokemons);
  }, []);

  return (
    <View style={globalTheme.globalMargin}>
      <PokeBallBg style={styles.imgPosition} />
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon: PokemonEntity, index) =>
          `${pokemon.id}-${index}`
        }
        style={{paddingTop: top + 20}}
        numColumns={2}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokedex</Text>}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {position: 'absolute', top: -100, right: -100},
});
