import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {marginHorizontal: 8, flex: 1},
  messageItem: {
    marginVertical: 4,
  },
  sendMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  textContainerStyle: {
    flex: 1,
    marginRight: 6,
  },
  textInputStyle: {
    padding: 2,
  },
  day: {
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 2,
    borderColor: lightTheme.primary,
    marginRight: 6,
  },
  sendMessageModel: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sendMessageView: {
    backgroundColor: 'white',
    padding: 20,
    paddingHorizontal: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    elevation: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 144,
    height: 144,
  },
  iconContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  imagePickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default styles;
