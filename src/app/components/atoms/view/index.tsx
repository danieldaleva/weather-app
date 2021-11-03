import { AppContext } from 'app/contexts/app/AppContext';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { styles } from './styles';
import * as appConstants from 'app/constants';

/**
 * type CustomViewProps
 * @prop {'parent' | 'child'} type
 */
type CustomViewProps = {
  type?: 'parent' | 'child';
};

export type ViewProps = CustomViewProps & View['props'];

const initialDimensions = {
  width: Dimensions.get('window').width || 'auto',
  height: '100%',
};

const ResponsiveView: React.FC<ViewProps> = ({ children, style, type }) => {
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
    <View
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
    </View>
  );
};

export default ResponsiveView;
