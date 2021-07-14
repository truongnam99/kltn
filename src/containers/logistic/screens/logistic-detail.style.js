import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
  contactContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    padding: 4,
    elevation: 6,
  },
  buttonContact: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderColor: lightTheme.primary,
    borderWidth: 1,
  },
});

export default styles;
