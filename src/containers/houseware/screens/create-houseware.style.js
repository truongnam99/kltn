import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    padding: 6,
    backgroundColor: 'white',
  },
  content: {
    textAlignVertical: 'top',
    height: 150,
    paddingBottom: 6,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAddHouseware: {
    fontSize: 14,
  },
  iconAddHouseware: {
    color: lightTheme.primary,
  },
  newItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  pickerContainerStype: {
    borderBottomWidth: 1,
  },
  pickerTitleStyle: {
    fontSize: 16,
  },
  inputContainerStyle: {
    paddingBottom: 4,
  },
  marginBottom: {
    paddingTop: 8,
    paddingBottom: 20,
    width: 120,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
