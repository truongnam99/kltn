import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scroolView: {
    paddingVertical: 6,
    paddingHorizontal: 2,
    backgroundColor: 'white',
    borderRadius: 4,
    minHeight: 34,
  },
  itemFilter: {
    backgroundColor: '#c4c4c4',
    marginHorizontal: 2,
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 3,
  },
  filterIcon: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 5,
    marginLeft: 8,
  },
  modalView: {
    width: '70%',
    backgroundColor: 'white',
    padding: 8,
    position: 'absolute',
    right: 10,
    top: 90,
    borderRadius: 6,
    elevation: 2,
  },
  sliderContainer: {
    paddingHorizontal: 6,
  },
  filterTouchable: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 10,
    top: 50,
  },
});
