import {StyleSheet} from 'react-native';
import {lightTheme} from './config/theme';

export const globalStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  ml8: {
    marginLeft: 8,
  },
  primary: {
    backgroundColor: lightTheme.primary,
  },
  modalHeader: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: lightTheme.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 20,
  },
});
