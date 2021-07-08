import {StyleSheet} from 'react-native';
import {space2, space3} from '../../../components/shared';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  filterContainer: {
    margin: space3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filter: {
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 4,
    marginRight: 10,
    elevation: 1,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c4c4',
    borderRadius: 4,
    marginRight: 10,
  },
  changeViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c4c4',
    borderRadius: 4,
  },
  itemContainer: {
    marginRight: 6,
  },
  smallItemContainer: {
    width: '50%',
    padding: 4,
  },
  changeView: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    color: lightTheme.primary,
    elevation: 2,
  },
  loading: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
  },
  flatList: {
    paddingHorizontal: space3,
  },
  flatListSmall: {
    paddingHorizontal: space2,
  },
  filterIcon: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    color: lightTheme.primary,
    elevation: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  mr6: {
    marginRight: space3,
  },
  searchResultContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '80%',
    paddingTop: 8,
    paddingHorizontal: 10,
    elevation: 10,
    marginTop: 45,
    marginLeft: 16,
    borderRadius: 6,
  },
  searchItem: {
    marginBottom: 6,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
});

export default styles;
