import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  titleContainer: {marginBottom: 6},
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputCode: {
    borderRadius: 4,
    textAlign: 'center',
    width: 40,
    height: 40,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default styles;
