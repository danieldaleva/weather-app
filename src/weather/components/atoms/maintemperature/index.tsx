import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';

import useThemeColor from 'app/hooks/useThemeColor';
import { ResponsiveView } from 'app/components/atoms';

import { WeatherContext } from 'weather/contexts/weather/WeatherContext';
import { Fonts } from 'weather/styles';

import { CountUp } from 'use-count-up';

import { styles } from './styles';

const MainTemperature: React.FC = () => {
  const { data } = useContext(WeatherContext);
  const [temp, setTemp] = useState<number | undefined>();
  const [isCounting, setIsCounting] = useState(false);
  const [unitLabel, setUnitLabel] = useState('');
  const color = useThemeColor('text', null) as string;

  const handleSetUnitLabel = useCallback(() => {
    const label = data.defaultUnit.label || '';
    setUnitLabel(label);
  }, [data]);

  const handleSetTemp = useCallback(() => {
    const weather = data.weather as WeatherResponseEntity;
    const temperature = Math.round(weather.main?.temp as number) || 0;
    setTemp(temperature);
  }, [data]);

  useEffect(() => {
    if (data.isDataLoaded) {
      handleSetTemp();
    }
  }, [data, handleSetTemp]);

  useEffect(() => {
    if (data.defaultUnit) {
      handleSetUnitLabel();
    }
  }, [data, handleSetUnitLabel]);

  useEffect(() => {
    if (temp) {
      setIsCounting(true);
    }
  }, [temp]);

  return (
    <ResponsiveView style={styles.container}>
      <Text style={[Fonts.temp, { color }]}>
        <CountUp isCounting={isCounting} end={temp} duration={1} />
      </Text>
      <Text style={[Fonts.unit, { color }]}>{unitLabel}</Text>
    </ResponsiveView>
  );
};

export default MainTemperature;
