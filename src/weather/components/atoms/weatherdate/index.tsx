import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text } from 'react-native';

import moment from 'moment-timezone';

import useThemeColor from 'app/hooks/useThemeColor';
import Utils from 'weather/utils';

import { WeatherContext } from 'weather/contexts/weather/WeatherContext';
import { Fonts } from 'weather/styles';

const utils = new Utils();

const WeatherDate: React.FC = () => {
  const { data } = useContext(WeatherContext);
  const [date, setDate] = useState('');
  const color = useThemeColor('text', null) as string;

  const handleSetDate = useCallback(() => {
    if (utils.isObjectNotEmpty(data.weather) && data.isDataLoaded) {
      const weather = data.weather as WeatherResponseEntity;
      const weatherDate = weather.dt as number;
      const dt = moment(new Date(weatherDate * 1000))
        .local()
        .format('dddd, Do MMMM, HH:mm');

      setDate(dt);
    }
  }, [data]);

  useEffect(() => {
    if (data.isDataLoaded) {
      handleSetDate();
    }
  }, [data, handleSetDate]);

  return <Text style={[Fonts.date, { color }]}>{date}</Text>;
};

export default WeatherDate;
