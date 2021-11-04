import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import { WeatherTemplate } from 'weather/components/templates';

const Templates = storiesOf('Templates', module);
Templates.addDecorator(withKnobs);

Templates.add('Weather Template', () => <WeatherTemplate />);
