import React, { useCallback, useContext, useEffect, useReducer } from 'react';

import LocalStorage from 'app/services/storage';
import { AppContext } from 'app/contexts/app/AppContext';

import moment from 'moment-timezone';

import * as weatherConstants from 'weather/constants';
import WeatherReducer from 'weather/contexts/weather/WeatherReducer';
import Utils from 'weather/utils';

const utils = new Utils();

const initialState: WeatherEntity = {
  defaultUnit: weatherConstants.defaultUnit,
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

  const { children } = props;

  /**
   * handleRemoteData
   * Load Data from remote api
   * @param {string} date
   */

  const handleRemoteData = useCallback(async () => {
    const currentData: RemoteDataEntity = await LocalStorage.getLocalStorage(
      'currentData',
    );

    const unit = currentData
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
  const getLocalStorageData = useCallback(
    async (date: string) => {
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
      } else {
        handleRemoteData();
      }
    },
    [handleRemoteData],
  );

  /**
   * handleData
   */
  const handleData = useCallback(() => {
    if (app.location?.coords && app.lang) {
      LocalStorage.getLocalStorage('date').then((date: string | null) => {
        if (date) {
          getLocalStorageData(date).then(() =>
            dispatchApp({
              type: 'SET_APP_IS_DATA_LOADED',
              payload: {
                isDataLoaded: true,
              },
            }),
          );
        } else {
          handleRemoteData().then(() =>
            dispatchApp({
              type: 'SET_APP_IS_DATA_LOADED',
              payload: {
                isDataLoaded: true,
              },
            }),
          );
        }
      });
    }
  }, [app, getLocalStorageData, dispatchApp, handleRemoteData]);

  useEffect(() => {
    handleData();
  }, [handleData]);

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
