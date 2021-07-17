import {StyleSheet} from 'react-native';
import {lightTheme} from '../../config/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 8,
    padding: 8,
    marginBottom: 8,
  },
  ratingResultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  textRatingResult: {
    color: '#000',
    marginLeft: 12,
    fontSize: 18,
  },
  mt: {
    marginTop: 10,
  },
  mb: {
    marginBottom: 8,
  },
  reviewText: {
    textAlignVertical: 'top',
  },
  avata: {
    width: 36,
    height: 36,
    borderRadius: 32,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  ml: {
    marginLeft: 6,
  },
  fz: {
    fontSize: 14,
  },
  reviewAt: {
    fontStyle: 'italic',
  },
  itemContainer: {
    padding: 8,
  },
  line: {
    borderBottomColor: lightTheme.grayC4,
    borderBottomWidth: 1,
  },
  numberOfRate: {
    fontStyle: 'italic',
    marginTop: 3,
  },
  seeMore: {
    color: lightTheme.secondary,
    padding: 4,
  },
  center: {
    alignItems: 'center',
  },
  buttonReportContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
