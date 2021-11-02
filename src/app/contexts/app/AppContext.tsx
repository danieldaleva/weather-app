import { useColorScheme } from 'app/hooks';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { createContext } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import AppReducer from 'app/contexts/app/AppReducer';
import * as Location from 'expo-location';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import NetInfo from '@react-native-community/netinfo';

import * as Localization from 'expo-localization';
import * as appConstants from 'app/constants';

import pt_br from 'app/locales/pt-br';
import es from 'app/locales/es';
import _t from 'mady';

const initialState: AppEntity = {
  location: null,
  lang: 'en-US',
  timezone: appConstants.TZ,
  colorScheme: 'dark',
  dimensions: Dimensions.get('window'),
  isConnected: true,
  isAppLoaded: false,
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

  /**
   * App location
   */
  const appLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      async (err: GeolocationError) => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError({
            name: 'LOCATION_NOT_PERMITED',
            message: JSON.stringify(err),
          });
        }
        appLocation();
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );

    // TODO: implement Watch Position after Last Position
    //  Geolocation.watchPosition(
    //   position => {
    //     setLocation(position);
    //   },
    //   async (err: GeolocationError) => {
    //     const { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //       setError({
    //         name: 'LOCATION_NOT_PERMITED',
    //         message: JSON.stringify(err),
    //       });
    //     }
    //     appLocation();
    //   },
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 100000,
    //     distanceFilter: 200,
    //     useSignificantChanges: true,
    //   },
    // );
    // return () => Geolocation.clearWatch(watch);
  }, []);

  /**
   * App window dimensions
   */
  const appDimensions = useCallback(() => {
    const onDimensionsChange = ({ window }: { window: ScaledSize }): void => {
      setDimensions(window);
    };

    Dimensions.addEventListener('change', onDimensionsChange);
    return () => Dimensions.removeEventListener('change', onDimensionsChange);
  }, []);

  /**
   * App connection
   */
  const appConnection = useCallback(() => {
    const onConnectionChange = (connection: boolean | null): void => {
      if (typeof connection === 'boolean') {
        if (connection) {
          setIsConnected(connection);
        } else {
          setError({
            name: 'INTERNET_DISCONNECTED',
            message: _t('You are disconnected. Check your internet connection'),
          });
        }
      }
    };

    NetInfo.addEventListener(connection =>
      onConnectionChange(connection?.isInternetReachable),
    );
  }, []);

  /**
   * App language
   */
  const appLanguage = useCallback(() => {
    if (Localization.locale) {
      setLang(Localization.locale);

      if (Localization.locale.indexOf('pt') > -1) {
        _t.addLocales('pt-br', pt_br);
        _t.setLocales('pt-br');
      }
      if (Localization.locale.indexOf('es') > -1) {
        _t.addLocales('es', es);
        _t.setLocales('es');
      }
    }
  }, []);

  /**
   * App timezone
   */
  const appTimezone = useCallback(() => {
    if (Localization.locale) {
      setTimezone(Localization.timezone || appConstants.TZ);
    }
  }, []);

  useEffect(() => {
    appLocation();
    appConnection();
    appLanguage();
    appTimezone();
    appDimensions();
  }, [appConnection, appDimensions, appLanguage, appLocation, appTimezone]);

  /*
   * useEffect - Dispatch App
   */
  useEffect(() => {
    if (location !== null && lang && timezone && colorScheme) {
      dispatchApp({
        type: 'SET_APP_ALL_DATA',
        payload: {
          location,
          lang,
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
  }, [dimensions]);

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

  useEffect(() => {
    if (dimensions && location !== null && colorScheme && lang && timezone) {
      dispatchApp({
        type: 'SET_APP_IS_LOADED',
        payload: {
          isAppLoaded: true,
        },
      });
    }
  }, [lang, location, timezone, colorScheme, dimensions]);

  return (
    <AppContext.Provider value={{ app, dispatchApp }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
