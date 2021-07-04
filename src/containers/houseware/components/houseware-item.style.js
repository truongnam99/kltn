import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    elevation: 1,
  },
  container: {
    flexDirection: 'row',
  },
  photo: {
    width: '35%',
    aspectRatio: 1,
    borderRadius: 6,
  },
  detail: {
    flex: 1,
    marginLeft: 6,
  },
  image: {
    borderRadius: 6,
  },
  textInputStyle: {
    fontSize: 14,
    paddingTop: 0,
  },
  titleStyle: {
    marginBottom: 0,
  },
  description: {
    textAlignVertical: 'top',
    height: 48,
  },
});
