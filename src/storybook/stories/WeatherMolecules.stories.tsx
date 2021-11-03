import React from 'react';
import { Colors } from 'app/styles';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { GradientView } from 'app/components/atoms';
import { Temperatures, WeatherButtons } from 'weather/components/molecules';

const Molecules = storiesOf('molecules', module);
Molecules.addDecorator(withKnobs);

Molecules.add('Weather Temperatures', () => (
  <GradientView type="parent" colors={Colors.light.gradient} style={[]}>
    <Temperatures />
  </GradientView>
));

Molecules.add('Weather Buttons', () => (
  <GradientView type="parent" colors={Colors.light.gradient} style={[]}>
    <WeatherButtons />
  </GradientView>
));
