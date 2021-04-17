import {StyleSheet} from 'react-native';

import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    backgroundColor: lightTheme.primary,
    justifyContent: 'center',
  },
  icon: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: 'white',
  },
  iconContainer: {
    borderRadius: 4,
    marginLeft: 8,
    position: 'absolute',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 22,
  },
  titleContainer: {
    alignItems: 'center',
  },
  primaryContainer: {
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 8,
  },
  detailContainer: {
    margin: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fontSize16: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  rowLayout: {
    flexDirection: 'row',
  },
  me16: {
    marginEnd: 16,
  },
});

export default styles;
