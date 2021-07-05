import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    paddingVertical: 4,
    paddingHorizontal: 6,
    flex: 1,
  },
  avatar: {
    borderRadius: 32,
    width: 40,
    height: 40,
    marginTop: 6,
  },
  name: {
    fontSize: 16,
  },
  content: {
    flexWrap: 'wrap',
    fontStyle: 'italic',
  },
  online: {
    width: 12,
    height: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'green',
    position: 'absolute',
    marginTop: 8,
    marginLeft: 30,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default styles;
