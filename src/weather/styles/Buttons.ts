import { StyleSheet } from 'react-native';
import { Colors } from 'app/styles';

const Buttons = StyleSheet.create({
  size: {
    width: 64,
    height: 64,
    borderRadius: 64,
    borderWidth: 0,
  },
  fontSize: {
    fontSize: 28,
  },
  default: {
    backgroundColor: Colors.dark.transparent,
    color: Colors.dark.default,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
});

export default Buttons;
