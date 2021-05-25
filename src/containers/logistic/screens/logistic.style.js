import {StyleSheet} from 'react-native';
import {space2, space3} from '../../../components/shared';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    paddingHorizontal: space2,
    marginTop: space2,
  },
  cartItem: {
    padding: 4,
    width: '50%',
  },
  filterIcon: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    color: lightTheme.primary,
    elevation: 2,
  },
  main: {
    paddingHorizontal: space3,
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  styleContainer: {
    top: -50,
  },
  itemFilterContainerStyle: {
    paddingVertical: 6,
    paddingHorizontal: 0,
    marginRight: 6,
    elevation: 1,
  },
});

export default styles;
