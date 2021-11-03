import { GradientView, ResponsiveView } from 'app/components/atoms';
import { StackScreenProps } from '@react-navigation/stack';
import { AppContext } from 'app/contexts/app/AppContext';
import { useThemeColor } from 'app/hooks';
import _t from 'mady';

import React, { Suspense, useContext } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { WeatherContext } from 'weather/contexts/weather/WeatherContext';

import { styles } from './styles';
import { Routes } from 'app/navigation/types';

const StorybookScreen = ({
  route,
}: StackScreenProps<RootTabParamList, Routes.Storybook>) => {
  const { data } = useContext(WeatherContext);
  const { app } = useContext(AppContext);
  const colors = useThemeColor('gradient', null) as string[];

  route.name;

  const color = useThemeColor('text', null) as string;

  if (app.isAppLoaded && data.isDataLoaded && route.name === 'Storybook') {
    const Storybook = React.lazy(() => import('storybook/').then());
    return (
      <Suspense
        fallback={
          <GradientView
            nativeID={route.key}
            colors={colors}
            style={styles.container}>
            <View>
              <ActivityIndicator size="large" color={color} />
            </View>
            <Text style={[{ color }, styles.text]}>{_t('Loading...')}</Text>
          </GradientView>
        }>
        <GradientView nativeID="Storybook" colors={colors} type="parent">
          <ResponsiveView type="parent">
            <Storybook />
          </ResponsiveView>
        </GradientView>
      </Suspense>
    );
  }

  return (
    <GradientView nativeID={route.key} colors={colors} type="parent">
      <ResponsiveView type="parent" />
    </GradientView>
  );
};

export default StorybookScreen;
