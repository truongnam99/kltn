import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  infoContainer: {
    margin: 6,
    overflow: 'hidden',
  },
  username: {
    marginLeft: 4,
    flex: 1,
  },
  price: {
    marginTop: 4,
  },
});

export default styles;
