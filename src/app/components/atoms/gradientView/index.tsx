import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { AppContext } from 'app/contexts/app/AppContext';
import { Gradients } from 'app/styles';

import { styles } from './styles';
import * as appConstants from 'app/constants';

/**
 * type CustomViewProps
 * @prop {'parent' | 'child'} type
 */
type CustomViewProps = {
  colors: string[];
  type?: 'parent' | 'child';
};

export type ViewProps = CustomViewProps & View['props'];

const initialDimensions = {
  width: Dimensions.get('window').width || 'auto',
  // height: Dimensions.get('window').height || 'auto',
  height: '100%',
};

const GradientView: React.FC<ViewProps> = ({
  colors,
  children,
  style,
  type,
}) => {
  const { app } = useContext(AppContext);
  const [dimensions, setDimensions] = useState(initialDimensions);

  const handleDimensions = useCallback(() => {
    setDimensions({
      width:
        (type &&
          (type === 'parent'
            ? app.dimensions.width
            : app.dimensions.width - appConstants.CHILDREN_PADDING)) ||
        'auto',
      height: '100%',
    });
  }, [app.dimensions, type]);

  useEffect(() => {
    handleDimensions();
  }, [app.dimensions, handleDimensions]);

  return (
    <LinearGradient
      colors={colors}
      start={Gradients.linearGradient.linearVertical.start}
      end={Gradients.linearGradient.linearVertical.end}
      style={[
        {
          width: dimensions.width,
          height: dimensions.height,
        },
        styles.container,
        type && (type === 'child' ? styles.child : styles.default),
        style,
      ]}>
      {children}
    </LinearGradient>
  );
};

export default GradientView;
