import {CardStyleInterpolators} from '@react-navigation/stack';
import {lightTheme} from './theme';

export const headerOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyle: {
    backgroundColor: lightTheme.primary,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
};
