import { Dimensions, StyleSheet } from 'react-native';
import * as appConstants from 'app/constants';

export const styles = StyleSheet.create({
  temps: {
    width: (Dimensions.get('window').width - appConstants.CHILDREN_PADDING) / 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
