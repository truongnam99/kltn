import {StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderColor: lightTheme.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  loading: {},
});

export default styles;
