import {StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';
import {space2} from '../shared';

export const styles = StyleSheet.create({
  container: {},
  selectedContainer: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: lightTheme.primary,
  },
  itemContainer: {
    padding: 8,
    width: 200,
    backgroundColor: 'white',
    elevation: 10,
    maxHeight: 300,
    overflow: 'scroll',
  },
  itemSelected: {},
  centerView: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 4,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#c2c2c2',
  },
  flex1: {
    flex: 1,
  },
  searchResultContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '80%',
    paddingTop: 8,
    paddingHorizontal: 10,
    elevation: 10,
    marginTop: 45,
    marginLeft: 16,
    borderRadius: 6,
  },
  searchItem: {
    marginBottom: 6,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  searchTextContaner: {
    marginBottom: 4,
  },
});

export const dropdownStyles = StyleSheet.create({
  container: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: lightTheme.primary,
    backgroundColor: 'transparent',
    height: null,
    paddingVertical: 3,
  },
  borderError: {
    borderColor: 'red',
  },
  title: {
    fontSize: 14,
  },
  modalContentContainerStyle: {
    marginHorizontal: 50,
    backgroundColor: 'white',
    height: 250,
    flexGrow: 0.5,
    marginTop: 150,
    elevation: 3,
    borderRadius: 6,
  },
  mvStatus: {
    marginVertical: 300,
  },
  required: {
    color: 'red',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  hintStyle: {
    fontStyle: 'italic',
  },
  hintContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  searchTextInputStyle: {
    borderRadius: 5,
    borderColor: lightTheme.primary,
  },
  listItemLabelStyle: {
    fontSize: 14,
  },
  textStyle: {
    fontSize: 14,
  },
});
