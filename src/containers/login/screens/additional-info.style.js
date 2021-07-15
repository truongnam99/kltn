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
    backgroundColor: 'white',
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
    height: 38,
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
  titleStyle: {
    fontSize: 16,
    marginBottom: 3,
  },
  modalBackground: {
    backgroundColor: '#c4c4c4a4',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    marginVertical: 50,
    padding: 10,
    borderRadius: 8,
  },
  headerTerm: {
    borderBottomColor: lightTheme.grayC4,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttonAcceptTerm: {
    backgroundColor: lightTheme.primary,
    paddingVertical: 8,
    borderRadius: 4,
    paddingHorizontal: 6,
    marginTop: 10,
  },
  buttonSave: {
    marginTop: 10,
  },
  textAcceptTerm: {
    textAlign: 'center',
    color: 'white',
  },
});

export default styles;
