import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Toast from 'app/components/atoms/toast';
import LoaderScreen from 'app/screens/loader/LoaderScreen';

import { useCachedResources } from 'app/hooks';

import { Colors } from 'app/styles';

import BottomTabNavigator from './BottomTabNavigation';
import { AppContext } from 'app/contexts/app/AppContext';
import { WeatherContext } from 'weather/contexts/weather/WeatherContext';
import { Routes } from './types';

const RootStack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const isResourceLoadingComplete = useCachedResources();
  const { app } = useContext(AppContext);
  const { data } = useContext(WeatherContext);

  return (
    <NavigationContainer theme={{ dark: true, colors: Colors.dark }}>
      {app.error && <Toast message={app.error.message} />}
      <RootStack.Navigator
        initialRouteName={Routes.Root}
        screenOptions={{
          headerShown: false,
        }}>
        {app.isAppLoaded && data.isDataLoaded && isResourceLoadingComplete ? (
          <RootStack.Screen
            name={Routes.Root}
            component={BottomTabNavigator}
            options={{ title: 'Weather App' }}
          />
        ) : (
          <RootStack.Screen
            name={Routes.Loader}
            component={LoaderScreen}
            options={{ title: 'Loading...' }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
