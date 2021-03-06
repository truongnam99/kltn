import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 1,
  },
  imageContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 100,
  },
  infoContainer: {
    marginVertical: 6,
    marginHorizontal: 6,
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
