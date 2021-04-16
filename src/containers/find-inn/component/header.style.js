import {StyleSheet} from 'react-native';

import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.primary,
    height: 48,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  textInput: {
    borderRadius: 4,
    backgroundColor: 'white',
    width: '82%',
  },
  searchButtonContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 36,
    height: 36,
  },
});

export default styles;
