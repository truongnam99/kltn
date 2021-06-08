import {StyleSheet} from 'react-native';
import {space3} from '../../../components/shared';

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    position: 'absolute',
    backgroundColor: 'white',
    marginTop: 95,
    alignSelf: 'flex-end',
    end: 10,
    borderRadius: 10,
    padding: 8,
  },
  sliderContainer: {
    height: 30,
    marginHorizontal: 10,
  },
  priceStyle: {
    fontWeight: 'bold',
  },
  buttonApply: {
    marginTop: 10,
  },
  picker: {
    width: 200,
    marginBottom: space3,
  },
});

export default styles;
