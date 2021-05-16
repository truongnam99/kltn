import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  flatlist: {
    paddingHorizontal: 6,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  itemStyle: {
    marginVertical: 6,
  },
  content: {
    textAlignVertical: 'top',
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
});
