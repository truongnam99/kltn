import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 140,
  },
  button: {
    justifyContent: 'flex-start',
    paddingStart: 32,
    paddingVertical: 8,
    marginHorizontal: 32,
    marginTop: 16,
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 150,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    color: 'white',
  },
  marginEnd: {
    marginEnd: 8,
  },
});

export default styles;
