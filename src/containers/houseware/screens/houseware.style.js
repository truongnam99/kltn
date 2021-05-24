import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  filter: {
    elevation: 500,
    margin: 6,
  },
});
