import {StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 16,
  },
  textInput: {
    borderColor: lightTheme.primary,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 6,
    paddingStart: 8,
    color: '#000000',
    fontSize: 16,
    paddingBottom: 0,
  },
  textInputOutline: {
    borderColor: lightTheme.primary,
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    paddingStart: 8,
    color: '#000000',
    fontSize: 16,
  },
});

export default styles;
