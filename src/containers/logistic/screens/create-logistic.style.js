import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: 'white',
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textAlign: {
    textAlignVertical: 'top',
    height: 150,
  },
  textInputStyle: {
    paddingVertical: 0,
    fontSize: 16,
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
