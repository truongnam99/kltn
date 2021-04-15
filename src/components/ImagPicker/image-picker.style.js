import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  imageItem: {marginRight: 2, marginBottom: 2},
  imageListContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'red',
    flexWrap: 'wrap',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  addIconContainer: {
    display: 'flex',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c7c7c7',
  },
  addIcon: {
    color: '#c7c7c7',
  },
});

export default styles;
