import {StyleSheet} from 'react-native';
import {lightTheme} from './config/theme';

export const globalStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  ml8: {
    marginLeft: 8,
  },
  ml6: {
    marginLeft: 6,
  },
  primary: {
    backgroundColor: lightTheme.primary,
  },
  gray: {
    backgroundColor: lightTheme.grayC4,
  },
  modalHeader: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: lightTheme.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 20,
  },
  modalHeaderFullScreen: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
  tcenter: {
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  fullwidth: {
    width: '100%',
  },
});
