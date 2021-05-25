import {StyleSheet} from 'react-native';
import {space2} from '../../../components/shared';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  marginTop: {
    marginTop: space2,
  },
  dateInput: {
    borderColor: lightTheme.primary,
    borderWidth: 0,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dateText: {
    textAlign: 'left',
    fontSize: 16,
    marginLeft: 4,
  },
  dateTouchBody: {
    width: '100%',
  },
  birthdayText: {
    marginTop: 8,
    marginBottom: 2,
    fontSize: 16,
  },
  mt8: {
    marginTop: 8,
  },
});

export default styles;
