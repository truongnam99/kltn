import {StyleSheet} from 'react-native';
import {space3} from '../../../components/shared';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterIcon: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    color: lightTheme.primary,
    elevation: 2,
  },
  main: {
    marginHorizontal: space3,
  },
  filterContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filter: {
    paddingVertical: 6,
    paddingHorizontal: 0,
    marginRight: 6,
    elevation: 1,
  },
  itemStyle: {
    marginBottom: space3,
    elevation: 5,
  },
  flastList: {
    margin: space3,
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  filterModelContainer: {
    top: -50,
  },
});

export default styles;
