import {CardStyleInterpolators} from '@react-navigation/stack';
import {lightTheme} from './theme';

export const headerOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyle: {
    backgroundColor: lightTheme.primary,
    height: 44,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
};

export const MAP_BOX_ACCESS_TOKEN =
  'pk.eyJ1IjoidHJ1b25nbmFtIiwiYSI6ImNrcTdxeTZzMjA4dHcydnJzNnFyc2tvNmwifQ.UaZdk2qAnkpxQaoSmEipdQ';
