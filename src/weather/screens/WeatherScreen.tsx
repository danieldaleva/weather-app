import React from 'react';

import { GradientView } from 'app/components/atoms';

import useThemeColor from 'app/hooks/useThemeColor';

import { WeatherTemplate } from 'weather/components/templates';
import { Routes } from 'app/navigation/types';
import { StackScreenProps } from '@react-navigation/stack';

const WeatherScreen = ({
  route,
}: StackScreenProps<RootTabParamList, Routes.Storybook>) => {
  const colors = useThemeColor('gradient', null) as string[];

  return (
    <GradientView nativeID={route.key} colors={colors} type="parent">
      <WeatherTemplate />
    </GradientView>
  );
};
export default WeatherScreen;
