import { GeolocationResponse } from '@react-native-community/geolocation';
import { apiController } from 'app/services/api';
import LocalStorage from 'app/services/storage';
import _t from 'mady';

import moment from 'moment-timezone';
import AppUtils from 'app/utils';

import * as weatherConstants from 'weather/constants';

/**
 * Class Utils
 * extends AppUtils and implements WeatherUtils interface
 * @class Utils
 */
class Utils extends AppUtils implements WeatherUtils {
  /** appLoadWeatherImages
   * @returns {Promise<void>}
   */
  appLoadWeatherImages = async (): Promise<void> => {
    const icons: { [key: string]: any } = {
      i200_201_202: await import('weather/assets/svg/i200_201_202.svg'),
      i200_201_202a11d: await import('weather/assets/svg/i200_201_202a11d.svg'),
      i200_201_202a11n: await import('weather/assets/svg/i200_201_202a11n.svg'),
      i201_211_212_221_230_231_232a02d: await import(
        'weather/assets/svg/i201_211_212_221_230_231_232a02d.svg'
      ),
      i201_211_212_221_230_231_232a02n: await import(
        'weather/assets/svg/i201_211_212_221_230_231_232a02n.svg'
      ),
      i500: await import('weather/assets/svg/i500.svg'),
      i500a10d: await import('weather/assets/svg/i500a10d.svg'),
      i500a10n: await import('weather/assets/svg/i500a10n.svg'),
      i501_502a10d: await import('weather/assets/svg/i501_502a10d.svg'),
      i501_502a10n: await import('weather/assets/svg/i501_502a10n.svg'),
      i503_504a10d: await import('weather/assets/svg/i503_504a10d.svg'),
      i503_504a10n: await import('weather/assets/svg/i503_504a10n.svg'),
      i503_504: await import('weather/assets/svg/i503_504.svg'),
      i520: await import('weather/assets/svg/i520.svg'),
      i520a09d: await import('weather/assets/svg/i520a09d.svg'),
      i520a09n: await import('weather/assets/svg/i520a09n.svg'),
      i521_531: await import('weather/assets/svg/i521_531.svg'),
      i521_531a09d: await import('weather/assets/svg/i521_531a09d.svg'),
      i521_531a09n: await import('weather/assets/svg/i521_531a09n.svg'),
      i522: await import('weather/assets/svg/i522.svg'),
      i522a09d: await import('weather/assets/svg/i522a09d.svg'),
      i522a09n: await import('weather/assets/svg/i522a09n.svg'),
      i600: await import('weather/assets/svg/i600.svg'),
      i600a13d: await import('weather/assets/svg/i600a13d.svg'),
      i600a13n: await import('weather/assets/svg/i600a13n.svg'),
      i601_602_611: await import('weather/assets/svg/i601_602_611.svg'),
      i601_602_611a13d: await import('weather/assets/svg/i601_602_611a13d.svg'),
      i601_602_611a13n: await import('weather/assets/svg/i601_602_611a13n.svg'),
      i701_711_721_731_741_751_761: await import(
        'weather/assets/svg/i701_711_721_731_741_751_761.svg'
      ),
      i701_711_721_731_741_751_761a50d: await import(
        'weather/assets/svg/i701_711_721_731_741_751_761a50d.svg'
      ),
      i701_711_721_731_741_751_761a50n: await import(
        'weather/assets/svg/i701_711_721_731_741_751_761a50n.svg'
      ),
      i771_781: await import('weather/assets/svg/i771_781.svg'),
      i771_781a50d: await import('weather/assets/svg/i771_781a50d.svg'),
      i771_781a50n: await import('weather/assets/svg/i771_781a50n.svg'),
      i800a01d: await import('weather/assets/svg/i800a01d.svg'),
      i800a01n: await import('weather/assets/svg/i800a01n.svg'),
      i801: await import('weather/assets/svg/i801.svg'),
      i801a02d: await import('weather/assets/svg/i801a02d.svg'),
      i801a02n: await import('weather/assets/svg/i801a02n.svg'),
      i802: await import('weather/assets/svg/i802.svg'),
      i802a03d: await import('weather/assets/svg/i802a03d.svg'),
      i802a03n: await import('weather/assets/svg/i802a03n.svg'),
      i803_804: await import('weather/assets/svg/i803_804.svg'),
      i803_804a04d: await import('weather/assets/svg/i803_804a04d.svg'),
      i803_804a04n: await import('weather/assets/svg/i803_804a04n.svg'),
      thermometer: await import('weather/assets/svg/thermometer.svg'),
      placeholder: await import('weather/assets/svg/placeholder.svg'),
    };

    await LocalStorage.setLocalStorage('icons', icons);
  };

  /** getWeatherApiUrl
   * @param {string} defaultUnit
   * @param { GeolocationResponse['coords']} coords
   * @param {string} lang
   * @returns {Promise<void>}
   */
  getWeatherApiUrl = async (
    defaultUnit: string,
    coords: GeolocationResponse['coords'],
    lang: string,
  ): Promise<string> => {
    let fullUrl = weatherConstants.API_URL;
    fullUrl += weatherConstants.WEATHER_ENDPOINT;
    fullUrl += '?';
    fullUrl += `appid=${weatherConstants.API_KEY}`;
    fullUrl += `&units=${defaultUnit}`;
    fullUrl += `&lat=${coords.latitude}`;
    fullUrl += `&lon=${coords.longitude}`;
    fullUrl += `&lang=${lang}`;
    fullUrl += `&date=${Date.now().toPrecision()}`;
    return fullUrl;
  };

  /**
   * getWeatherDefaultUnit
   * @param {string} update
   * @returns {Promise<UnitEntity>}
   */
  getWeatherDefaultUnit = async (update: string): Promise<UnitEntity> => {
    const defaultUnit = weatherConstants.units.find(unit => unit.id === update);
    return defaultUnit || weatherConstants.defaultUnit;
  };

  /**
   * setWeatherLocalStorage
   * @param {WeatherEntity} remote
   * @returns {Promise<void>}
   */
  setWeatherLocalStorage = async (remote: WeatherEntity): Promise<void> => {
    await LocalStorage.setLocalStorage('currentData', remote);
    await LocalStorage.setLocalStorage('date', moment().local().format());
  };

  /**
   * getWeatherRemoteData
   * @param {AppEntity} app
   * @param {string} unit
   * @returns {Promise<RemoteDataEntity>}
   */
  getWeatherRemoteData = async (
    app: AppEntity,
    unit: string,
  ): Promise<RemoteDataEntity> => {
    const defaultUnit = await this.getWeatherDefaultUnit(unit);

    let payload: RemoteDataEntity = {
      isDataLoaded: false,
      weather: {},
      defaultUnit,
    };

    if (app.location?.coords && app.lang) {
      const coords = app.location?.coords;
      const url = await this.getWeatherApiUrl(defaultUnit.id, coords, app.lang);

      try {
        const request = { url, method: 'GET' };
        const response = await apiController.handle(request);

        if (response?.data) {
          payload = {
            isDataLoaded: true,
            weather: response.data,
            defaultUnit,
          };

          await this.setWeatherLocalStorage(payload);
          return payload;
        }
        setTimeout(() => this.getWeatherRemoteData(app, unit), 5000);
      } catch (error: any) {
        payload = {
          isDataLoaded: false,
          weather: {},
          defaultUnit,
          error: {
            name: 'Payload',
            message: _t('Connection Error'),
            stack: JSON.stringify(error),
          },
        };
        return payload;
      }
    }
    return payload;
  };
}

export default Utils;
