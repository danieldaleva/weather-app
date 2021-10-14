import { useColorScheme } from 'app/hooks';
import React, { useEffect, useReducer, useState } from 'react';
import { createContext } from 'react';
import { Dimensions } from 'react-native';
import AppReducer from 'app/contexts/app/AppReducer';
import Utils from 'app/utils';
import { GeolocationResponse } from '@react-native-community/geolocation';

import * as appConstants from 'app/constants';

const utils = new Utils();

const initialState: AppEntity = {
  location: null,
  lang: 'en-US',
  timezone: appConstants.TZ,
  colorScheme: 'dark',
  dimensions: Dimensions.get('window'),
  isConnected: true,
  isDataLoaded: false,
  error: null,
};

export const AppContext = createContext<AppContextEntity>({
  app: initialState,
  dispatchApp: () => ({}),
});

const AppContextProvider: React.FC = (props: ReactPropsEntity) => {
  const [app, dispatchApp] = useReducer(AppReducer, initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [lang, setLang] = useState<string>('en_US');
  const [timezone, setTimezone] = useState<string>(appConstants.TZ);
  const [error, setError] = useState<Error | null>(null);
  const [location, setLocation] = useState<GeolocationResponse | null>(null);

  const colorScheme = useColorScheme();

  const { children } = props;

  /*
   * UseEffect - InitApp
   */
  useEffect(() => {
    utils.appConnection(setIsConnected, setError);
    utils.appLanguage(setLang);
    utils.appLocation(setLocation, setError);
    utils.appTimezone(setTimezone);
    utils.appDimensions(setDimensions);
  }, []);

  /*
   * useEffect - Dispatch App
   */
  useEffect(() => {
    if (lang && location && timezone && colorScheme) {
      dispatchApp({
        type: 'SET_APP_ALL_DATA',
        payload: {
          lang,
          location,
          timezone,
          colorScheme,
        },
      });
    }
  }, [lang, location, timezone, colorScheme]);

  /*
   * useEffect - Dispatch Connection
   */
  useEffect(() => {
    dispatchApp({
      type: 'SET_APP_IS_CONNECTED',
      payload: {
        isConnected,
      },
    });
  }, [isConnected]);

  /*
   * useEffect - Dispatch Dimensions
   */
  useEffect(() => {
    if (dimensions) {
      dispatchApp({
        type: 'SET_APP_DIMENSIONS',
        payload: {
          dimensions,
        },
      });
    }
  }, [app, dimensions]);

  /*
   * useEffect - Dispatch Error
   */
  useEffect(() => {
    if (error) {
      dispatchApp({
        type: 'SET_ERROR',
        payload: {
          error,
        },
      });
    }
  }, [error]);

  return (
    <AppContext.Provider value={{ app, dispatchApp }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
