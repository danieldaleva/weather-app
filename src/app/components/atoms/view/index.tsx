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
  height: Dimensions.get('window').height || 'auto',
};

const ResponsiveView: React.FC<ViewProps> = ({
  children,
  style,
  type,
  nativeID,
}) => {
  const { app } = useContext(AppContext);
  const [dimensions, setDimensions] = useState(initialDimensions);

  const handleDimensions = useCallback(() => {
    setDimensions({
      width: type ? '100%' : 'auto',
      height:
        type && type === 'parent'
          ? app.dimensions.height - appConstants.TAB_BOTTOM_DEFAULT_PADDING
          : 'auto',
    });
  }, [app.dimensions, type]);

  useEffect(() => {
    handleDimensions();
  }, [app.dimensions, handleDimensions]);

  return (
    <View
      nativeID={nativeID}
      style={[
        dimensions,
        styles.container,
        type && (type === 'child' ? styles.child : styles.default),
        style,
      ]}>
      {children}
    </View>
  );
};

export default ResponsiveView;
