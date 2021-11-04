import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  GradientView,
  ResponsiveScrollView,
  ResponsiveView,
} from 'app/components/atoms';
import {
  MainTemperature,
  WeatherDate,
  WeatherIcon,
  WeatherLocation,
} from 'weather/components/atoms';
import * as appConstants from 'weather/constants';

import { styles } from './styles';
import { Colors } from 'app/styles';

const AtomStories = storiesOf('Atoms', module);
AtomStories.add('All Weather Icons', () => {
  return (
    <ResponsiveScrollView nativeID="weather-atoms">
      <ResponsiveView style={styles.container}>
        {appConstants.weatherAppIcons.map(id => (
          <WeatherIcon key={id} id={id} />
        ))}
      </ResponsiveView>
    </ResponsiveScrollView>
  );
});

AtomStories.add('Theme Day View', () => {
  return (
    <GradientView type="parent" colors={Colors.light.gradient}>
      <ResponsiveView type="parent" style={styles.container}>
        <WeatherIcon id="i800a01d" />
      </ResponsiveView>
    </GradientView>
  );
});

AtomStories.add('Theme Night View', () => (
  <GradientView type="parent" colors={Colors.dark.gradient}>
    <ResponsiveView type="parent" style={styles.container}>
      <WeatherIcon id="i800a01n" />
    </ResponsiveView>
  </GradientView>
));

AtomStories.add('Weather Date', () => (
  <ResponsiveView type="parent" style={styles.container}>
    <WeatherDate />
  </ResponsiveView>
));

AtomStories.add('Weather Location', () => (
  <ResponsiveView type="parent" style={styles.container}>
    <WeatherLocation />
  </ResponsiveView>
));

AtomStories.add('Main Temperature', () => (
  <ResponsiveView type="parent" style={styles.container}>
    <MainTemperature />
  </ResponsiveView>
));
