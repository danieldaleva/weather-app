import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text } from 'react-native';

import Utils from 'app/providers/utils';
import useThemeColor from 'app/hooks/useThemeColor';

import { WeatherContext } from 'weather/contexts/weather/WeatherContext';
import { Fonts } from 'weather/styles';

const utils = new Utils();

const WeatherLocation: React.FC = () => {
  const { data } = useContext(WeatherContext);
  const [location, setLocation] = useState('');
  const color = useThemeColor('text', null) as string;

  const handleSetLocation = useCallback(() => {
    if (utils.isObjectNotEmpty(data.weather) && data.isDataLoaded) {
      const weather = data.weather as WeatherResponseEntity;
      setLocation(`${weather.name}, ${weather.sys.country}`);
    }
  }, [data]);

  useEffect(() => {
    if (data.isDataLoaded) {
      handleSetLocation();
    }
  }, [data, handleSetLocation]);

  return <Text style={[Fonts.location, { color }]}>{location}</Text>;
};

export default WeatherLocation;
