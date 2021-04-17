import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 90,
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
  itemContainer: {},
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
});

export default styles;
