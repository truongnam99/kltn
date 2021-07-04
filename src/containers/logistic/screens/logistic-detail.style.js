import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  infoContainer: {
    padding: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  userContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 30,
  },
  username: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    marginTop: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rowLayout: {
    flexDirection: 'row',
  },
  me16: {
    marginEnd: 16,
  },
});

export default styles;
