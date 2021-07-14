import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  leftContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  rightContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginEnd: 8,
  },
  text: {
    maxWidth: 250,
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
    flexWrap: 'wrap',
  },
  leftText: {
    marginLeft: 6,
    backgroundColor: 'white',
    color: '#000000',
  },
  rightText: {
    backgroundColor: lightTheme.primary,
    color: 'white',
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 30,
  },
  imageMessage: {
    width: 144,
    height: 144,
    borderRadius: 8,
  },
});

export default styles;
