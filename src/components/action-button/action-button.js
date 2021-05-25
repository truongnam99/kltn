import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {fadeIn, fadeOut, rotate, rotateReverse} from '../../assets/animation';
import {activeOpacity} from '../shared';

export const ActionButtonItem = ({
  title,
  children,
  style,
  show,
  buttonColor,
  onPress,
  closeActionItem,
  ...props
}) => {
  const [isActive, setIsActive] = useState(show);
  const animationRef = useRef(null);

  useEffect(() => {
    if (show && !isActive) {
      setIsActive(show);
      return;
    }
    if (animationRef) {
      animationRef.current?.animate(fadeOut);
      setTimeout(() => {
        setIsActive(show);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handelOnPress = useCallback(() => {
    closeActionItem();
    onPress();
  }, [closeActionItem, onPress]);

  if (!isActive) {
    return null;
  }

  return (
    <Animatable.View ref={animationRef} animation={fadeIn} duration={500}>
      <Text numberOfLines={1} style={styles.text}>
        {title}
      </Text>
      <View
        style={[
          styles.buttonActionBase,
          styles.buttonActionItem,
          buttonColor && {backgroundColor: buttonColor},
        ]}>
        <TouchableOpacity activeOpacity={activeOpacity} onPress={handelOnPress}>
          {children}
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

export const ActionButton = ({children, buttonColor, ...rest}) => {
  const [openActionItem, setOpenActionItem] = useState(false);

  const rotateAnimationRef = useRef(null);

  const onActionButtonPress = useCallback(() => {
    setOpenActionItem(!openActionItem);
    if (rotateAnimationRef) {
      rotateAnimationRef.current?.animate(
        !openActionItem ? rotate : rotateReverse,
        500,
      );
    }
  }, [setOpenActionItem, openActionItem]);

  const closeActionItem = useCallback(() => {
    setOpenActionItem(false);
  }, [setOpenActionItem]);

  const _renderItem = useCallback(() => {
    const actionButtonItems = Array.isArray(children) ? children : [children];
    return (
      <>
        {actionButtonItems.map((actionButtonItem, index) => {
          return (
            <ActionButtonItem
              key={index}
              show={openActionItem}
              closeActionItem={closeActionItem}
              {...actionButtonItem.props}
            />
          );
        })}
      </>
    );
  }, [openActionItem, children]);

  return (
    <View style={styles.absolute}>
      {_renderItem()}
      <View
        style={[
          styles.buttonActionBase,
          buttonColor && {backgroundColor: buttonColor},
        ]}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onActionButtonPress}>
          <Animatable.View ref={rotateAnimationRef}>
            <Ionicons name="add" size={32} color="white" style={[styles.add]} />
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonActionBase: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'rgba(231,76,60,1)',
  },
  buttonActionItem: {
    marginBottom: 10,
  },
  absolute: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  add: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    right: 64,
    top: 20,
    textAlign: 'right',
    width: 150,
  },
});
