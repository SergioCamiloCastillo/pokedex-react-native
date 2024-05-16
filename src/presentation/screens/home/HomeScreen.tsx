import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {getPokemonsUseCase} from '../../../domain/use-cases/pokemons';

export const HomeScreen = () => {
  const {isLoading, isError, data} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemonsUseCase(),
    staleTime: 1000 * 60 * 60,
  });
  return (
    <View>
      <Text>Home Screen</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      )}
    </View>
  );
};
