import React from 'react';
import {View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import styles from './header-action.style';

const HeaderAction = ({
  onClose,
  onCheck,
  isShowClose = true,
  isShowCheck = true,
}) => {
  return (
    <View style={styles.container}>
      {isShowClose && (
        <AntIcon
          name="close"
          size={24}
          style={styles.closeIcon}
          onPress={() => onClose()}
        />
      )}
      {isShowCheck && (
        <AntIcon
          name="check"
          size={24}
          style={styles.checkIcon}
          onPress={() => onCheck()}
        />
      )}
    </View>
  );
};

export default HeaderAction;
