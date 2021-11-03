import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  GradientView,
  ResponsiveScrollView,
  ResponsiveView,
} from 'app/components/atoms';
import { Colors } from 'app/styles';
import {
  MainTemperature,
  WeatherDate,
  WeatherIcon,
  WeatherLocation,
} from 'weather/components/atoms';
import * as appConstants from 'weather/constants';

const AtomStories = storiesOf('Atoms', module);
AtomStories.add('All Weather Icons', () => (
  <ResponsiveScrollView
    nativeID="weather-atoms"
    type="parent"
    contentContainerStyle={[]}>
    <ResponsiveView style={[]}>
      {appConstants.weatherAppIcons.map(id => (
        <WeatherIcon key={id} id={id} />
      ))}
    </ResponsiveView>
  </ResponsiveScrollView>
));

AtomStories.add('Theme Day View', () => (
  <GradientView type="parent" colors={Colors.light.gradient} style={[]}>
    <ResponsiveView style={[]}>
      <WeatherIcon id="i800a01d" />
    </ResponsiveView>
  </GradientView>
));

AtomStories.add('Theme Night View', () => (
  <GradientView type="parent" colors={Colors.dark.gradient} style={[]}>
    <ResponsiveView style={[]}>
      <WeatherIcon id="i800a01n" />
    </ResponsiveView>
  </GradientView>
));

AtomStories.add('Weather Date', () => (
  <ResponsiveView style={[]}>
    <WeatherDate />
  </ResponsiveView>
));

AtomStories.add('Weather Location', () => (
  <ResponsiveView style={[]}>
    <WeatherLocation />
  </ResponsiveView>
));

AtomStories.add('Main Temperature', () => (
  <ResponsiveView style={[]}>
    <MainTemperature />
  </ResponsiveView>
));
