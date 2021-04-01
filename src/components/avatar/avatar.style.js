import {Dimensions, StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  detailContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailImage: {
    resizeMode: 'cover',
    width: 160,
    height: 160,
    bottom: 60,
    borderColor: lightTheme.primary,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  detailImageFullScreen: {
    resizeMode: 'contain',
    width: width,
    aspectRatio: 1,
    backgroundColor: 'white',
  },
});

export default styles;
