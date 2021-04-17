import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  avatar: {
    borderRadius: 32,
    width: 32,
    height: 32,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  content: {
    marginTop: 8,
  },
  seeMore: {
    color: lightTheme.secondary,
  },
});

export default styles;
