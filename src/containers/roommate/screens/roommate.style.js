import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {},
  filterIcon: {
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 4,
    color: lightTheme.primary,
  },
  main: {
    marginHorizontal: 15,
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
    width: '85%',
    paddingHorizontal: 4,
  },
  itemStyle: {
    marginBottom: 8,
  },
  itemContainer: {
    margin: 10,
    marginBottom: 96,
  },
});

export default styles;
