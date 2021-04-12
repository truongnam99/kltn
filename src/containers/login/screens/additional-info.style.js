import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  infoContainer: {
    marginTop: 22,
  },
  container: {
    padding: 20,
  },
  changeAvatar: {
    marginTop: 6,
  },
  marginTop: {
    marginTop: 2,
  },
  dateInput: {
    borderColor: lightTheme.primary,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dateTouchBody: {
    width: '100%',
  },
  dateText: {
    textAlign: 'left',
    fontSize: 16,
    marginLeft: 4,
  },
  birthdayText: {
    marginTop: 8,
    marginBottom: 2,
    fontSize: 16,
  },
});

export default styles;
