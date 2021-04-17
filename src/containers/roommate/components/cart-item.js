import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './cart-item.style';
import {translate} from '../../../constants/translate';

const maxNumberOfLines = 5;

const CartItem = ({avatar, content, name, ...props}) => {
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
      <View style={styles.userContainer}>
        <Image source={{uri: avatar}} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text
        style={styles.content}
        numberOfLines={state.numberOfLines}
        onTextLayout={onTextLayout}>
        {content}
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
