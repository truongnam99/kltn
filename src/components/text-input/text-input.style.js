import {StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';
import {boderRadius, space1, space2} from '../shared';

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 16,
    marginBottom: space1,
  },
  textInputBase: {
    borderColor: lightTheme.primary,
    paddingHorizontal: 6,
    paddingVertical: space2,
    color: '#000000',
    paddingStart: 8,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingBottom: 0,
  },
  textInputOutline: {
    borderWidth: 1,
    borderRadius: boderRadius,
  },
  fieldRequire: {
    color: 'red',
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
  titleContainer: {
    flexDirection: 'row',
  },
});

export default styles;
