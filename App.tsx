// import './wydr';

import AppContextProvider from 'app/contexts/app/AppContext';
import { useThemeColor } from 'app/hooks';
import Navigation from 'app/navigation';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WeatherContextProvider from 'weather/contexts/weather/WeatherContext';
// import { enableScreens } from 'react-native-screens';

// enableScreens(true);

const App: React.FC = () => {
  const backgroundColor = useThemeColor(
    'background',
    null,
  ) as unknown as string;

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
