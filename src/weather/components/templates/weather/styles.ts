import { Dimensions, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    width: '100%',
    flex: 1,
  },
  containerContent: { flex: 1 },
  childContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
  },

  footer: { height: '100%', flex: 1, justifyContent: 'flex-end' },
});
