import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';

export const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
};
