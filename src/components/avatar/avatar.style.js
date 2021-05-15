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
    borderRadius: 100,
  },
  detailImage: {
    resizeMode: 'cover',
    width: 160,
    height: 160,
    borderRadius: 100,
    borderColor: lightTheme.primary,
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
