import {StyleSheet} from 'react-native';
import {boderRadius, space2, space3, space4} from '../../../components/shared';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  infoContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  changeAvatar: {
    marginTop: 6,
  },
  marginTop: {
    marginTop: space3,
  },
  dateInput: {
    borderColor: lightTheme.primary,
    borderRadius: boderRadius,
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
    marginTop: space3,
    marginBottom: space2,
    fontSize: 16,
  },
  pickerContainerStype: {
    borderRadius: 6,
    borderWidth: 1,
  },
  textInputStyle: {
    textAlignVertical: 'center',
    paddingTop: 3,
  },
  scrollViewLastItem: {
    marginTop: space4,
    marginBottom: 20,
  },
  require: {
    color: 'red',
  },
});

export default styles;
