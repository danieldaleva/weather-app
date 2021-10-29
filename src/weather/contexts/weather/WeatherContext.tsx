import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import LocalStorage from 'app/services/storage';
import { AppContext } from 'app/contexts/app/AppContext';

import moment from 'moment-timezone';

import * as weatherConstants from 'weather/constants';
import WeatherReducer from 'weather/contexts/weather/WeatherReducer';
import Utils from 'weather/utils';

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
  const [weather, setWeather] = useState({});
  const [defaultUnit, setDefaultUnit] = useState(weatherConstants.defaultUnit);

  const { children } = props;

  /**
   * handleRemoteData
   * Load Data from remote api
   * @param {string} date
   */

  const handleRemoteData = useCallback(async () => {
    console.log('handleRemoteData');
    const currentData: RemoteDataEntity = await LocalStorage.getLocalStorage(
      'currentData',
    );

    console.log(currentData);
    const unit =
      currentData !== null
        ? currentData.defaultUnit
        : weatherConstants.defaultUnit;
    const response = await utils.getWeatherRemoteData(app, unit.id);

    if (response.error) {
      dispatchApp({
        type: 'SET_ERROR',
        payload: {
          error: response.error,
        },
      });
    } else {
      dispatchData({
        type: 'SET_ALL_WEATHER_DATA',
        payload: {
          defaultUnit: response.defaultUnit,
          weather: response.weather,
        },
      });
    }
  }, [app, dispatchApp]);

  /**
   * Get Local Storage if
   * Refresh Time <= REFRESH_TIME Constant Value
   * or else Get Remote Data from webservice
   * @param {string} date
   */
  const getLocalStorageData = useCallback(async (date: string) => {
    const minute = moment(moment().local().format()).diff(
      moment.parseZone(date).local().format(),
      'minute',
    );

    if (minute < weatherConstants.REFRESH_TIME) {
      LocalStorage.getLocalStorage('currentData').then(currentData => {
        dispatchData({
          type: 'SET_ALL_WEATHER_DATA',
          payload: {
            defaultUnit: currentData.defaultUnit,
            weather: currentData.weather,
          },
        });
      });
    }
  }, []);

  /**
   * handleData
   */
  const handleData = useCallback(async () => {
    if (app.location !== null) {
      const date = await LocalStorage.getLocalStorage('date');

      if (date) {
        await getLocalStorageData(date);
        dispatchData({
          type: 'SET_WEATHER_IS_DATA_LOADED',
          payload: {
            isDataLoaded: true,
          },
        });

        return;
      }

      handleRemoteData().then(() => {
        dispatchData({
          type: 'SET_WEATHER_IS_DATA_LOADED',
          payload: {
            isDataLoaded: true,
          },
        });
      });
    }
  }, [app.location, getLocalStorageData, handleRemoteData]);

  useEffect(() => {
    (async () => await handleData())();
  }, [handleData, app.location]);

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
