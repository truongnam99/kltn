import {StyleSheet} from 'react-native';
import {space3} from '../../../components/shared';

const styles = StyleSheet.create({
  container: {
    marginBottom: space3,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 1,
  },
  imageContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
    height: 250,
  },
  infoContainer: {
    marginVertical: 6,
    marginHorizontal: 6,
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default styles;
