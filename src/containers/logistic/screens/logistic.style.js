import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {},
  flatList: {
    padding: 8,
    marginBottom: 50,
  },
  cartItem: {
    padding: 4,
    width: '50%',
  },
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c4c4',
    borderRadius: 4,
  },
  filterModelContainer: {
    marginTop: 50,
  },
});

export default styles;
