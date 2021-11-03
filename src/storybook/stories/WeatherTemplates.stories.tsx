import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import { WeatherTemplate } from 'weather/components/templates';
import { GradientView } from 'app/components/atoms';
import { Colors } from 'app/styles';

const Templates = storiesOf('Templates', module);
Templates.addDecorator(withKnobs);

Templates.add('Weather Template', () => (
  <GradientView type="parent" colors={Colors.light.gradient} style={[]}>
    <WeatherTemplate />
  </GradientView>
));
