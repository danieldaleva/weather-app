import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import LocalStorage from 'app/providers/storage';
import { AppContext } from 'app/contexts/app/AppContext';

import moment from 'moment-timezone';

import * as weatherConstants from 'weather/constants';
import WeatherReducer from 'weather/contexts/weather/WeatherReducer';
import Utils from 'weather/providers/utils';

const utils = new Utils();

const initialState: WeatherEntity = {
  defaultUnit: weatherConstants.defaultUnit,
  isDataLoaded: false,
  weather: {},
};

export const WeatherContext = React.createContext<WeatherContextEntity>({
  data: initialState,
  dispatchData: () => ({}),
});

const WeatherContextProvider: React.FC<ReactPropsEntity> = (
  props: ReactPropsEntity,
) => {
  const [data, dispatchData] = useReducer(WeatherReducer, initialState);
  const { app, dispatchApp } = useContext(AppContext);
  const [weather, setWeather] = useState<RemoteDataEntity | unknown>({});
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [defaultUnit, setDefaultUnit] = useState<UnitEntity>(
    weatherConstants.defaultUnit,
  );

  const { children } = props;

  /**
   * handleRemoteData
   * Load Data from remote api
   * @param {string} date
   */

  const handleRemoteData = useCallback(async () => {
    if (app.isAppLoaded) {
      const currentData: RemoteDataEntity = await LocalStorage.getLocalStorage(
        'currentData',
      );

      const unit =
        currentData !== null
          ? currentData.defaultUnit
          : weatherConstants.defaultUnit;
      const response = await utils.getWeatherRemoteData(app, unit.id);

      if (response.error) {
        setError(response.error);
      } else {
        setWeather(response.weather);
        setDefaultUnit(response.defaultUnit);
        setIsDataLoaded(true);
      }
    }
  }, [app]);

  /**
   * Get Local Storage if
   * Refresh Time <= REFRESH_TIME Constant Value
   * or else Get Remote Data from webservice
   * @param {string} date
   */
  const getLocalStorageData = useCallback(async (date: string) => {
    if (date) {
      const minute = moment(moment().local().format()).diff(
        moment.parseZone(date).local().format(),
        'minute',
      );

      if (minute < weatherConstants.REFRESH_TIME) {
        const currentData = await LocalStorage.getLocalStorage('currentData');
        if (currentData) {
          setWeather(currentData.weather);
          setDefaultUnit(currentData.defaultUnit);
          setIsDataLoaded(true);
          return true;
        }
      }
    }

    return false;
  }, []);

  const handleData = useCallback(async () => {
    if (app.isAppLoaded) {
      const date = await LocalStorage.getLocalStorage('date');
      const local = await getLocalStorageData(date);

      if (!local) {
        await handleRemoteData();
      }
    }
  }, [app.isAppLoaded, getLocalStorageData, handleRemoteData]);

  useEffect(() => {
    if (app.isAppLoaded) {
      (async () => await handleData())();
    }
  }, [handleData, app.isAppLoaded]);

  useEffect(() => {
    if (utils.isObjectNotEmpty(weather)) {
      dispatchData({
        type: 'SET_ALL_WEATHER_DATA',
        payload: {
          defaultUnit,
          weather,
        },
      });
    }
  }, [defaultUnit, weather]);

  useEffect(() => {
    dispatchData({
      type: 'SET_WEATHER_IS_DATA_LOADED',
      payload: {
        isDataLoaded,
      },
    });
  }, [isDataLoaded]);

  useEffect(() => {
    dispatchApp({
      type: 'SET_ERROR',
      payload: {
        error,
      },
    });
  }, [dispatchApp, error]);

  return (
    <WeatherContext.Provider
      value={{
        data,
        dispatchData,
      }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
