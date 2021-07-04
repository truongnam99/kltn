import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white',
  },
  textContent: {
    height: 150,
    borderColor: lightTheme.primary,
    borderBottomWidth: 1,
    textAlignVertical: 'top',
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: 'black',
    fontSize: 14,
  },
  title: {
    marginBottom: 4,
    fontSize: 16,
  },
  buttonContainer: {
    paddingTop: 8,
    paddingBottom: 20,
    width: 120,
  },
  buttonDelete: {
    paddingTop: 8,
    paddingBottom: 20,
    width: 120,
    marginLeft: 16,
  },
  buttonDeleteTitle: {
    color: lightTheme.secondary,
  },
  buttonDeleteStyle: {
    borderColor: lightTheme.secondary,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerStyle: {
    marginBottom: 8,
  },
  titleStyle: {
    marginBottom: 0,
    fontSize: 16,
  },
  fontSize: {
    fontSize: 16,
  },
});
