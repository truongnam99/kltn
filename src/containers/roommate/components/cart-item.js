import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './cart-item.style';
import {translate} from '../../../constants/translate';
import {
  MenuOption,
  MenuOptions,
  MenuTrigger,
  Menu,
} from 'react-native-popup-menu';

const maxNumberOfLines = 5;

const CartItem = ({
  id,
  owner,
  content,
  userInfo,
  onFoundRoommate,
  ...props
}) => {
  const [state, setState] = useState({
    baseLine: -1,
    isShowSeeMore: false,
    numberOfLines: undefined,
  });

  const onTextLayout = e => {
    if (state.baseLine !== -1) {
      return;
    }
    if (e.nativeEvent.lines.length && state.baseLine === -1) {
      if (e.nativeEvent.lines.length > maxNumberOfLines) {
        setState({
          numberOfLines: maxNumberOfLines,
          isShowSeeMore: true,
          baseLine: e.nativeEvent.lines.length,
        });
      } else {
        setState({
          ...state,
          baseLine: e.nativeEvent.lines.length,
        });
      }
    }
  };

  const onSetNumberOfLine = () => {
    setState({
      isShowSeeMore: false,
      numberOfLines: undefined,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.userContainer}>
          <Image source={{uri: owner.photoURL}} style={styles.avatar} />
          <Text style={styles.name}>{owner.displayName}</Text>
        </View>
        {userInfo.uid === owner.uid && (
          <Menu>
            <MenuTrigger>
              <MaterialCommunityIcons name="dots-horizontal" size={24} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                text={translate.roommate.foundRoommate}
                onSelect={() => onFoundRoommate(id)}
              />
            </MenuOptions>
          </Menu>
        )}
      </View>
      <Text
        style={styles.content}
        numberOfLines={state.numberOfLines}
        onTextLayout={onTextLayout}>
        {content}
        {props.haveInnContent && (
          <Text>
            {props.innName && <Text>{'\nTên trọ: ' + props.innName}</Text>}
            {props.innOwner && <Text>{'\nChủ trọ: ' + props.innOwner}</Text>}
            {props.innPrice && <Text>{'\nGiá: ' + props.innPrice}</Text>}
            {props.innAddress && (
              <Text>{'\nĐịa chỉ: ' + props.innAddress}</Text>
            )}
            {props.innWaterPrice && (
              <Text>{'\nTiền nước: ' + props.innWaterPrice}</Text>
            )}
            {props.innElectricPrice && (
              <Text>{'\nTiền điện:' + props.innElectricPrice}</Text>
            )}
            {props.innArea && <Text>{'\n' + props.innArea}</Text>}
            {props.innDeposit && <Text>{'\n' + props.innDeposit}</Text>}
          </Text>
        )}
      </Text>
      <TouchableOpacity onPress={() => onSetNumberOfLine()}>
        {state.isShowSeeMore && (
          <Text style={styles.seeMore}>{translate.seeMore}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
