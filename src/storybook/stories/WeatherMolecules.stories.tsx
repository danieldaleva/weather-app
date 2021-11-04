import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { ResponsiveView } from 'app/components/atoms';
import { Temperatures, WeatherButtons } from 'weather/components/molecules';

import { styles } from './styles';

const Molecules = storiesOf('molecules', module);
Molecules.addDecorator(withKnobs);

Molecules.add('Weather Temperatures', () => (
  <ResponsiveView type="parent" style={styles.container}>
    <Temperatures />
  </ResponsiveView>
));

Molecules.add('Weather Buttons', () => (
  <ResponsiveView type="parent" style={styles.container}>
    <WeatherButtons />
  </ResponsiveView>
));
