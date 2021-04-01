import {StyleSheet} from 'react-native';
import fonts from '../../config/font';

const styles = StyleSheet.create({
  h1: {
    fontSize: 12,
    fontFamily: fonts.android.fontFamily,
  },
  h2: {
    fontSize: 16,
    fontFamily: fonts.android.fontFamily,
  },
  h3: {
    fontSize: 22,
    fontFamily: fonts.android.fontFamily,
  },
  h4: {
    fontSize: 28,
    fontFamily: fonts.android.fontFamily,
  },
  h5: {
    fontSize: 32,
    fontFamily: fonts.android.fontFamily,
  },
  normal: {
    fontStyle: 'normal',
  },
  italic: {
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: 'bold',
  },
  w100: {
    fontWeight: '100',
  },
  w200: {
    fontWeight: '200',
  },
  w300: {
    fontWeight: '300',
  },
  w400: {
    fontWeight: '400',
  },
  w500: {
    fontWeight: '500',
  },
});

export default styles;
