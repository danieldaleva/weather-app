import React from 'react';
import { View } from 'react-native';

import { ResponsiveView } from 'app/components/atoms';

import { MainTemperature, WeatherIcon } from 'weather/components/atoms';

import { styles } from './styles';

const WeatherContent: React.FC = () => {
  return (
    <ResponsiveView style={styles.container}>
      <View style={styles.mainTemp}>
        <MainTemperature />
      </View>
      <View style={styles.icon}>
        <WeatherIcon
          styles={styles.image}
          width={200}
          height={200}
          viewBox="30 50 250 250"
        />
      </View>
    </ResponsiveView>
  );
};

export default WeatherContent;
