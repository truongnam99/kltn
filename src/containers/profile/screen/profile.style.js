import {StyleSheet} from 'react-native';
import {space2} from '../../../components/shared';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
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
  buttonStyle: {
    width: 120,
  },
  buttonSecondaryColor: {
    backgroundColor: '#A4A4A4',
  },
  buttonContainer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  fontSize: {
    fontSize: 16,
  },
  contact: {
    marginTop: 4,
    marginBottom: 16,
  },
});

export default styles;
