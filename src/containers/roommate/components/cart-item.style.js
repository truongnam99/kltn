import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 1,
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nameContainer: {
    marginLeft: 6,
    flexDirection: 'column',
  },
  activeText: {
    fontSize: 10,
  },
  content: {
    marginTop: 8,
  },
  seeMore: {
    color: lightTheme.secondary,
  },
});

export default styles;
