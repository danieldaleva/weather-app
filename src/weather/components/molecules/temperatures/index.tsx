import React, { useCallback, useContext, useEffect, useState } from 'react';

import { ResponsiveView } from 'app/components/atoms';

import Utils from 'weather/utils';
import { WeatherContext } from 'weather/contexts/weather/WeatherContext';
import { WeatherTemps } from 'weather/components/atoms';

import _t from 'mady';

import { styles } from './styles';

const utils = new Utils();

const Temperatures: React.FC = () => {
  const { data } = useContext(WeatherContext);
  const [temp, setTemp] = useState({
    tempMax: '0',
    tempMin: '0',
    humidity: '0',
  });
  const [defaultUnit, setDefaultUnit] = useState<UnitEntity>(data.defaultUnit);

  const handleSetDefaultUnit = useCallback(async () => {
    const unit = await utils.getWeatherDefaultUnit(data.defaultUnit.id);
    setDefaultUnit(unit);
  }, [data.defaultUnit]);

  const handleSetTemp = useCallback(() => {
    const weather = data.weather as WeatherResponseEntity;
    const tempMax = weather.main.temp_max as number;
    const tempMin = weather.main.temp_min as number;
    const humidity = weather.main.humidity as number;
    setTemp({
      tempMax: `${tempMax}${defaultUnit.label}`,
      tempMin: `${tempMin}${defaultUnit.label}`,
      humidity: `${humidity}%`,
    });
  }, [data, defaultUnit]);

  useEffect(() => {
    if (utils.isObjectNotEmpty(data.weather) && data.isDataLoaded) {
      handleSetDefaultUnit();
    }
  }, [data, handleSetDefaultUnit]);

  useEffect(() => {
    if (
      utils.isObjectNotEmpty(data.weather) &&
      data.isDataLoaded &&
      defaultUnit
    ) {
      handleSetTemp();
    }
  }, [data, defaultUnit, handleSetTemp]);

  return (
    <ResponsiveView type="child" style={styles.container}>
      <WeatherTemps
        name="thermometer"
        type="ionicons"
        label={_t('Max')}
        value={temp.tempMax}
      />
      <WeatherTemps
        name="thermometer"
        type="ionicons"
        label={_t('Min')}
        value={temp.tempMin}
      />
      <WeatherTemps
        name="water"
        type="ionicons"
        label={_t('Humidity')}
        value={temp.humidity}
      />
    </ResponsiveView>
  );
};

export default Temperatures;
