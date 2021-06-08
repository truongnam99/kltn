import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button} from '../../components';
// import {showMessage} from 'react-native-flash-message';
// import MapViewDirections from 'react-native-maps-directions';
// import {Button, Marker} from '../../components';
// import MapView from 'react-native-maps';
// import {
//   ActionButton,
//   ActionButtonItem,
// } from '../../components/action-button/action-button';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Animated from 'react-native-reanimated';
// import MapPicker from '../../components/picker/map-picker';

// const ItemChildren = () => {
//   return <Text>aaaaaaaaaa</Text>;
// };

// const ItemContainer = ({children}) => {
//   return (
//     <View>
//       <Text>container</Text>
//       {children}
//     </View>
//   );
// };
import {
  createInnInFirebase,
  createInnInAlgolia,
  updateInnInFirebase,
} from '../../service/innService';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const ITEM_PREVIEW_HEIGHT = 150;
const HORIZONTAL_MARGIN = 20;
const SCALE_END = screen.width / ITEM_WIDTH;
const BREAKPOINT1 = 246;
const BREAKPOINT2 = 350;

export default function Test() {
  const onPush = useCallback(() => {
    try {
      result
        .map(item => {
          return {
            ...item,
            objectID: item.uid,
          };
        })
        .forEach(item => createInnInAlgolia(item));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Button title="upload" onPress={onPush} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d4d4d4',
    flex: 1,
  },
  c4: {
    backgroundColor: '#C4C4C4',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  flex1: {
    // flex: 1,
    height: '50%',
  },
  itemContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    elevation: 10,
    height: ITEM_PREVIEW_HEIGHT,
    marginHorizontal: HORIZONTAL_MARGIN,
    width: screen.width - 2 * HORIZONTAL_MARGIN,
    top: screen.height - ITEM_PREVIEW_HEIGHT,
    borderRadius: 8,
    padding: 8,
  },
});
