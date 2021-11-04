import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { GradientView } from 'app/components/atoms';
import useThemeColor from 'app/hooks/useThemeColor';
import _t from 'mady';
import { styles } from './styles';

const LoaderScreen: React.FC = () => {
  const colors = useThemeColor('gradient', null) as string[];
  const color = useThemeColor('text', null) as string;

  return (
    <GradientView colors={colors} style={styles.container}>
      <View>
        <ActivityIndicator size="large" color={color} />
      </View>
      <Text style={[{ color }, styles.text]}>{_t('Loading...')}</Text>
    </GradientView>
  );
};

export default LoaderScreen;
