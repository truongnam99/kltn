import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 24,
  },
  ownerView: {
    marginLeft: 8,
  },
  name: {
    fontSize: 16,
  },
  time: {fontSize: 12},
  photo: {
    aspectRatio: 1,
    borderRadius: 4,
  },
  headerContainer: {
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
  },
  dot: {
    fontWeight: 'bold',
  },
  itemContainer: {
    marginTop: 10,
  },
  itemDesciption: {
    marginLeft: 10,
    marginTop: 6,
  },
  bottomItemContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    start: 10,
    bottom: 0,
    paddingVertical: 5,
  },
  imageView: {
    overflow: 'hidden',
    width: '50%',
  },
  textBottomColor: {
    color: lightTheme.secondary,
  },
});
