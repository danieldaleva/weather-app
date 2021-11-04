import React from 'react';
import { View } from 'react-native';

import { ResponsiveView } from 'app/components/atoms';

import {
  WeatherDate,
  WeatherLocation,
  WeatherDetail,
} from 'weather/components/atoms';

import { styles } from './styles';

const WeatherHeader: React.FC = () => (
  <ResponsiveView style={styles.container}>
    <View style={styles.weatherDate}>
      <WeatherDate />
    </View>
    <View style={styles.weatherLocation}>
      <WeatherLocation />
      <View style={styles.weatherDetail}>
        <WeatherDetail />
      </View>
    </View>
  </ResponsiveView>
);

export default WeatherHeader;
