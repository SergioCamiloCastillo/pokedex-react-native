import {PropsWithChildren, createContext} from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {PaperProvider, adaptNavigationTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
export const ThemeContext = createContext({
  isDark: false,
  theme: LightTheme,
});
export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const themeCurrently = isDarkTheme ? DarkTheme : LightTheme;
  return (
    <PaperProvider theme={themeCurrently}>
      <NavigationContainer theme={themeCurrently}>
        <ThemeContext.Provider
          value={{
            isDark: isDarkTheme,
            theme: themeCurrently,
          }}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
