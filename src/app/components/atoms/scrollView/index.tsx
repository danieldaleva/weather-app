import { AppContext } from 'app/contexts/app/AppContext';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { styles } from './styles';
import * as appConstants from 'app/constants';

/**
 * type CustomViewProps
 * @prop {'parent' | 'child'} type
 */
type CustomViewProps = {
  type?: 'parent' | 'child';
};

export type ViewProps = CustomViewProps & ScrollView['props'];

const initialDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const ResponsiveScrollView: React.FC<ViewProps> = ({
  children,
  style,
  type,
}) => {
  const { app } = useContext(AppContext);
  const [dimensions, setDimensions] = useState(initialDimensions);

  const handleDimensions = useCallback(() => {
    setDimensions({
      width: app.dimensions.width,
      height:
        type && type === 'parent'
          ? app.dimensions.height - appConstants.TAB_BOTTOM_DEFAULT_PADDING
          : app.dimensions.height,
    });
  }, [app.dimensions, type]);

  useEffect(() => {
    handleDimensions();
  }, [app.dimensions, handleDimensions]);

  return (
    <ScrollView
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
    </ScrollView>
  );
};

export default ResponsiveScrollView;
