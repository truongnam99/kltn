import {StyleSheet} from 'react-native';

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
});

export default styles;
