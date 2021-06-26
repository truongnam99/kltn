import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    padding: 6,
    backgroundColor: 'white',
  },
  content: {
    textAlignVertical: 'top',
    height: 150,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAddHouseware: {
    fontSize: 14,
  },
  iconAddHouseware: {
    color: lightTheme.primary,
  },
  newItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  cityContainerStyle: {
    borderWidth: 1,
    borderRadius: 6,
  },
});
