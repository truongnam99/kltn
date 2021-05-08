import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'transparent',
  },
  textContent: {
    borderRadius: 8,
    height: 150,
    borderColor: lightTheme.primary,
    borderWidth: 1,
    textAlignVertical: 'top',
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: 'black',
    fontSize: 14,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  button: {
    marginVertical: 8,
    marginBottom: 16,
  },
});
