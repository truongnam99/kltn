import {StyleSheet} from 'react-native';
import {space3} from '../../../components/shared';
import {lightTheme} from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    paddingHorizontal: space3,
    paddingTop: space3,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  itemStyle: {
    marginBottom: space3,
    elevation: 1,
    borderRadius: 8,
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
  searchContainer: {
    backgroundColor: 'white',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  searchContainerStyle: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 0,
    padding: 0,
  },
  searchTextInputStyle: {
    marginVertical: 0,
    fontSize: 14,
    padding: 0,
  },
  searchButton: {
    borderColor: lightTheme.primary,
    borderRadius: 4,
    borderWidth: 1,
    padding: 2,
  },
});
