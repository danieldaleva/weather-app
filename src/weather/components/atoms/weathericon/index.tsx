import React from 'react';
import Utils from 'weather/utils';
import { useContext, useState, useCallback, useEffect } from 'react';
import { ImageProps, Platform, StyleProp, Image } from 'react-native';
import { SvgProps } from 'react-native-svg';

import LocalStorage from 'app/services/storage';

import * as weatherConstants from 'weather/constants';
import * as IconComponents from 'weather/components/atoms/weathericon/IconList';
import { WeatherContext } from 'weather/contexts/weather/WeatherContext';

import { Icons } from 'weather/styles';

const utils = new Utils();

export const getCachedIcons = async (): Promise<any> =>
  LocalStorage.getLocalStorage('icons');

export const getWeatherIcon = async (
  id: string,
  styles?: StyleProp<SvgProps> | StyleProp<ImageProps> | any,
  viewBox?: string,
  width?: number | undefined,
  height?: number | undefined,
) => {
  if (Platform.OS === 'web') {
    const cachedIcons = await getCachedIcons();
    const Icon = await cachedIcons[id];
    return (
      <Image style={[Icons.default, styles]} source={{ uri: Icon.default }} />
    );
  }

  const list: { [key: string]: any } = IconComponents;

  const Icon = list[id];

  return (
    <Icon
      width={width || Icons.default.width}
      height={height || Icons.default.height}
      viewBox={viewBox || Icons.default.viewBox}
    />
  );
};

const WeatherIcon: React.FC<{
  viewBox?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
  styles?: StyleProp<SvgProps> | undefined;
  id?: string | undefined;
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
    if (data && utils.isObjectNotEmpty(data.weather)) {
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
    getIcon();
  }, [data, getIcon]);

  return icon || null;
};

export default WeatherIcon;
