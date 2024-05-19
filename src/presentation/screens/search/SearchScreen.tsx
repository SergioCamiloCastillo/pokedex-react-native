import React, {useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {PokemonEntity} from '../../../domain/entities/pokemon';
import {ListPokemons} from '../../components/pokemons/ListPokemons';
import {useQuery} from '@tanstack/react-query';
import {
  getPokemonWithNamesId,
  getPokemonsByIds,
} from '../../../domain/use-cases/pokemons';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {useDebouceValue} from '../../hooks/useDebouceValue';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const debouncedValue = useDebouceValue({input: term});

  const {isLoading, data: pokemonNameList = []} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonWithNamesId(),
  });
  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(debouncedValue))) {
      //es un numero
      const pokemon = pokemonNameList.find(
        pokemon => pokemon.id === Number(debouncedValue),
      );
      return pokemon ? [pokemon] : [];
    }
    if (debouncedValue.length === 0 || debouncedValue.length < 3) return [];
    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(debouncedValue.toLowerCase()),
    );
  }, [debouncedValue]);
  const {isLoading: isLoadingPokemons, data: pokemons} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () =>
      getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5, //5 minutos,
  });
  if (isLoading) return <FullScreenLoader />;
  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Buscar pokemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
      />
      {isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}} />}
      <ListPokemons onlyPokemonsArray={pokemons} />
    </View>
  );
};
