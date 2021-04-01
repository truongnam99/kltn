import {StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';

const styles = StyleSheet.create({
  container: {},
  title: {},
  textInput: {
    borderColor: lightTheme.primary,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 6,
    paddingStart: 8,
  },
  textInputOutline: {
    borderColor: lightTheme.primary,
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    paddingStart: 8,
  },
});

export default styles;
