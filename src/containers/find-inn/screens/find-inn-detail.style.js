import {StyleSheet} from 'react-native';

import {lightTheme} from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    backgroundColor: lightTheme.primary,
    justifyContent: 'center',
  },
  icon: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: 'white',
  },
  iconContainer: {
    borderRadius: 4,
    marginLeft: 8,
    position: 'absolute',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 22,
  },
  titleContainer: {
    alignItems: 'center',
  },
  primaryContainer: {
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  detailContainer: {
    margin: 8,
    marginBottom: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fontSize16: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  rowLayout: {
    flexDirection: 'row',
  },
  me16: {
    marginEnd: 8,
  },
  avatar: {
    borderRadius: 32,
    width: 40,
    height: 40,
    marginTop: 6,
  },
  fz16: {
    fontSize: 16,
  },
  ml6: {
    marginLeft: 6,
  },
  mr: {
    marginRight: 4,
  },
  sb: {
    justifyContent: 'space-between',
  },
  sa: {
    justifyContent: 'space-around',
  },
  lineTop: {
    borderTopWidth: 1,
    borderTopColor: lightTheme.grayC4,
  },
  lineBottom: {
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.grayC4,
  },
  mv: {
    marginVertical: 6,
  },
  pv: {
    paddingVertical: 6,
  },
  center: {
    alignItems: 'center',
  },
  iconWidth: {
    width: '25%',
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
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  jcenter: {
    justifyContent: 'center',
  },
});

export default styles;
