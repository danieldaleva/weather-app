// import './wydr';

import AppContextProvider from './src/app/contexts/app/AppContext';
import WeatherContextProvider from './src/weather/contexts/weather/WeatherContext';
import { useThemeColor } from './src/app/hooks';
import Navigation from './src/app/navigation';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { enableScreens } from 'react-native-screens';

enableScreens(true);

const App: React.FC = () => {
  const backgroundColor = useThemeColor('background', null) as string;

  return (
    <AppContextProvider>
      <WeatherContextProvider>
        <SafeAreaProvider style={{ backgroundColor }}>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </SafeAreaProvider>
      </WeatherContextProvider>
    </AppContextProvider>
  );
};

export default App;
