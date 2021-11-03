import React from 'react';
import Utils from 'weather/providers/utils';
import { useContext, useState, useCallback, useEffect } from 'react';
import { ImageProps, Platform, StyleProp, Image } from 'react-native';
import { SvgProps, SvgWithCss } from 'react-native-svg';

import LocalStorage from 'app/providers/storage';

import * as weatherConstants from 'weather/constants';
import * as IconComponents from './IconList';
import { WeatherContext } from 'weather/contexts/weather/WeatherContext';

import { Icons } from 'weather/styles';

const utils = new Utils();

export const getCachedIcons = async (): Promise<any> =>
  LocalStorage.getLocalStorage('icons');

export const getWeatherIcon = async (
  id: string,
  styles?: StyleProp<SvgProps> | StyleProp<ImageProps> | any,
  viewBox?: string,
  width?: number,
  height?: number,
): Promise<JSX.Element> => {
  if (Platform.OS === 'web') {
    const cachedIcons = await getCachedIcons();
    const Icon = await cachedIcons[id];
    return (
      <Image style={[Icons.default, styles]} source={{ uri: Icon.default }} />
    );
  }

  const list: { [key: string]: any } = IconComponents;
  const idUppercase = id.toUpperCase();

  return (
    <SvgWithCss
      xml={list[idUppercase]}
      width={width || Icons.default.width}
      height={height || Icons.default.height}
      viewBox={viewBox || Icons.default.viewBox}
    />
  );
};

const WeatherIcon: React.FC<{
  viewBox?: string;
  width?: number;
  height?: number;
  styles?: StyleProp<SvgProps>;
  id?: string;
}> = ({ styles, viewBox, width, height, id }) => {
  const { data } = useContext(WeatherContext);
  const [icon, setIcon] = useState<any>();

  /*
   * icons: [i200_201a11d, ...]
   * i: eliminate prefix
   * group: 200_201a11d
   * a: split group
   * groupCodes: 200_201 (the weather code)
   * iconCode: 11d
   */
  const getIcon = useCallback(async () => {
    if (data.isDataLoaded && utils.isObjectNotEmpty(data.weather)) {
      const weather = data.weather as WeatherResponseEntity;
      let iconIndex = 0;
      if (!id) {
        const appIcons = new Set([weatherConstants.weatherAppIcons]);

        for (let i = 0; i < appIcons.entries.length; i++) {
          const group = weatherConstants.weatherAppIcons[i]
            .replace('i', '')
            .split('a');
          const groupCodes = group[0].split('_');
          const iconCode = groupCodes.find(
            (code: string) => weather.weather[0].id.toString() === code,
          );

          if (group[1]) {
            if (weather.weather[0].icon === group[1] && iconCode) {
              iconIndex = i;
              break;
            }
          } else if (weather.weather[0].id === iconCode) {
            iconIndex = i;
            break;
          }
        }
      }

      const component = await getWeatherIcon(
        id || weatherConstants.weatherAppIcons[iconIndex],
        styles,
        viewBox,
        width,
        height,
      );
      setIcon(component);
    }
  }, [data, height, id, styles, viewBox, width]);

  useEffect(() => {
    if (data.isDataLoaded) {
      getIcon();
    }
  }, [data, getIcon]);

  return icon || null;
};

export default WeatherIcon;
