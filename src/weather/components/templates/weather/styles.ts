import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    width: '100%',
  },
  header: {
    paddingTop: 20,
  },
  footer: { flex: 1 },
});
