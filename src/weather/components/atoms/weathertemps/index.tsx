import React from 'react';
import { View, Text } from 'react-native';

import { GlyphIcon, ResponsiveView } from 'app/components/atoms';

import useThemeColor from 'app/hooks/useThemeColor';

import _t from 'mady';

import { Fonts } from 'weather/styles';

import { styles } from './styles';

const WeatherTemps: React.FC<{
  name: string;
  type: 'ionicons' | 'fontawesome';
  label: string;
  value: string;
}> = ({ name, type, label, value }) => {
  const color = useThemeColor('text', null) as string;
  return (
    <ResponsiveView style={styles.temps}>
      <View>
        <GlyphIcon name={name} type={type} color={color} />
      </View>
      <View>
        <Text style={[Fonts.label, { color }]}>{_t(label)}</Text>
        <Text style={[Fonts.temps, { color }]}>{value}</Text>
      </View>
    </ResponsiveView>
  );
};

export default WeatherTemps;
