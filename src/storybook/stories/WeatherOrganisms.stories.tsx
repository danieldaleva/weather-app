import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { ResponsiveView } from 'app/components/atoms';
import {
  WeatherHeader,
  WeatherContent,
  WeatherFooter,
} from 'weather/components/organisms';
import { styles } from 'storybook/screens/styles';

const Organisms = storiesOf('Organisms', module);
Organisms.addDecorator(withKnobs);

Organisms.add('Weather Header', () => (
  <ResponsiveView type="parent" style={styles.container}>
    <WeatherHeader />
  </ResponsiveView>
));

Organisms.add('Weather Content', () => (
  <ResponsiveView type="parent" style={styles.container}>
    <WeatherContent />
  </ResponsiveView>
));

Organisms.add('Weather Footer', () => (
  <ResponsiveView type="parent" style={styles.container}>
    <WeatherFooter />
  </ResponsiveView>
));

Organisms.add('Weather Footer', () => (
  <ResponsiveView type="parent" style={styles.container}>
    <WeatherFooter />
  </ResponsiveView>
));
