import React from 'react';

import { ResponsiveView } from 'app/components/atoms';

import { Temperatures } from 'weather/components/molecules';

import { styles } from './styles';

const WeatherFooter: React.FC = () => {
  return (
    <ResponsiveView type="parent" style={styles.container}>
      <Temperatures />
    </ResponsiveView>
  );
};

export default WeatherFooter;
