import {StyleSheet, Dimensions} from 'react-native';
import {lightTheme} from '../../config/theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'space-between',
    backgroundColor: lightTheme.primary,
    elevation: 1,
  },
  checkIcon: {
    color: 'white',
  },
  closeIcon: {
    color: 'white',
  },
});

export default styles;
