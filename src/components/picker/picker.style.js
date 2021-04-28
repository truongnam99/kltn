import {StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';

const styles = StyleSheet.create({
  container: {},
  selectedContainer: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: lightTheme.primary,
  },
  itemContainer: {
    padding: 8,
    width: 200,
    backgroundColor: 'white',
    elevation: 10,
    maxHeight: 300,
    overflow: 'scroll',
  },
  itemSelected: {},
  centerView: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 4,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#c2c2c2',
  },
});

export default styles;
