import React from 'react';
import { Colors } from 'app/styles';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { GradientView } from 'app/components/atoms';
import {
  WeatherHeader,
  WeatherContent,
  WeatherFooter,
} from 'weather/components/organisms';

const Organisms = storiesOf('Organisms', module);
Organisms.addDecorator(withKnobs);

Organisms.add('Weather Header', () => (
  <GradientView type="parent" colors={Colors.light.gradient} style={[]}>
    <WeatherHeader />
  </GradientView>
));

Organisms.add('Weather Content', () => (
  <GradientView type="parent" colors={Colors.light.gradient} style={[]}>
    <WeatherContent />
  </GradientView>
));

Organisms.add('Weather Footer', () => (
  <GradientView type="parent" colors={Colors.light.gradient} style={[]}>
    <WeatherFooter />
  </GradientView>
));

Organisms.add('Weather Footer', () => (
  <GradientView type="parent" colors={Colors.light.gradient} style={[]}>
    <WeatherFooter />
  </GradientView>
));
