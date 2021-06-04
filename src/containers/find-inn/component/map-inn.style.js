import {Dimensions, StyleSheet} from 'react-native';

const screen = Dimensions.get('window');
const ITEM_PREVIEW_HEIGHT = 150;
const HORIZONTAL_MARGIN = 20;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  innContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    elevation: 10,
    height: ITEM_PREVIEW_HEIGHT,
    marginHorizontal: HORIZONTAL_MARGIN,
    width: screen.width - 2 * HORIZONTAL_MARGIN,
    top: screen.height - ITEM_PREVIEW_HEIGHT - 120,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  image: {
    height: '100%',
    aspectRatio: 1,
  },
  innInfoContainer: {
    flexDirection: 'column',
    marginLeft: 6,
    flex: 1,
  },
  iconClose: {
    position: 'absolute',
    right: 6,
    top: 6,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    color: '#a4a4a4',
    padding: 1,
  },
});
