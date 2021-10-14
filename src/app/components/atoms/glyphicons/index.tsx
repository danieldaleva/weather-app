import React from 'react';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const GlyphIcon: React.FC<{
  type: 'fontawesome' | 'ionicons';
  name: typeof FontAwesome5['name'] | typeof Ionicons['name'] | any;
  color: string;
}> = ({ type, name, color }) =>
  type === 'fontawesome' ? (
    <FontAwesome5 size={30} name={name} color={color} />
  ) : (
    <Ionicons size={30} name={name} color={color} />
  );

export default GlyphIcon;
