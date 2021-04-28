import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    marginHorizontal: 15,
    flex: 1,
    marginBottom: 10,
  },
  filterContainer: {
    marginTop: 10,
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
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  smallItemContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
    margin: 4,
    maxWidth: '50%',
  },
  changeView: {
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 4,
    color: lightTheme.primary,
  },
  loading: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
  },
  flex1: {
    flex: 1,
  },

  filterIcon: {
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 4,
    color: lightTheme.primary,
  },
});

export default styles;
