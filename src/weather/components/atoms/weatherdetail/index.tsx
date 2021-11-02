import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text } from 'react-native';

import useThemeColor from 'app/hooks/useThemeColor';
import Utils from 'weather/providers/utils';

import { WeatherContext } from 'weather/contexts/weather/WeatherContext';
import { Fonts } from 'weather/styles';

import _t from 'mady';

const utils = new Utils();

const WeatherDetail: React.FC = () => {
  const { data } = useContext(WeatherContext);
  const [detail, setDetail] = useState('');
  const [defaultUnit, setDefaultUnit] = useState<UnitEntity>(data.defaultUnit);
  const [description, setDescription] = useState('');
  const color = useThemeColor('text', null) as string;

  const handleSetDescription = useCallback(() => {
    if (utils.isObjectNotEmpty(data.weather) && data.isDataLoaded) {
      const weather = data.weather as WeatherResponseEntity;
      setDescription(weather.weather[0].description);
    }
  }, [data]);

  const handleSetDefaultUnit = useCallback(async () => {
    if (data.defaultUnit.unit) {
      const unit = await utils.getWeatherDefaultUnit(data.defaultUnit.id);
      setDefaultUnit(unit);
    }
  }, [data.defaultUnit]);

  const handleSetDate = useCallback(() => {
    if (
      utils.isObjectNotEmpty(data.weather) &&
      data.isDataLoaded &&
      defaultUnit
    ) {
      const weather = data.weather as WeatherResponseEntity;
      const feelsLike = `${parseInt(weather.main.feels_like.toString())}${
        defaultUnit.label
      }`;

      setDetail(feelsLike);
    }
  }, [data, defaultUnit]);

  useEffect(() => {
    if (utils.isObjectNotEmpty(data.weather) && data.isDataLoaded) {
      handleSetDate();
      handleSetDefaultUnit();
      handleSetDescription();
    }
  }, [data, handleSetDate, handleSetDescription, handleSetDefaultUnit]);

  return (
    <Text style={[Fonts.detail, { color }]}>
      {`${detail !== '' ? `${_t('Feels like')} ${detail}.` : ''} ${
        description !== '' ? `${_t(description)}.` : ''
      } `}
    </Text>
  );
};

export default WeatherDetail;
