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
});

export default styles;
