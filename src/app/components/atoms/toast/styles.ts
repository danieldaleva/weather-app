import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    zIndex: 999999999,
  },
  animated: {
    margin: 10,
    marginBottom: 5,
    color: '#000',
    backgroundColor: '#fc0',
    padding: 10,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
});

export default styles;
