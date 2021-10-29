import React from 'react';

import { GradientView } from 'app/components/atoms';

import useThemeColor from 'app/hooks/useThemeColor';

import { WeatherTemplate } from 'weather/components/templates';

const WeatherScreen: React.FC = () => {
  const colors = useThemeColor('gradient', null) as string[];

  return (
    <GradientView nativeID="Storybook" colors={colors} type="parent">
      <WeatherTemplate />
    </GradientView>
  );
};
export default WeatherScreen;
