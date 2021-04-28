import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {lightTheme} from '../../../config/theme';

import styles from './header.style';

const Header = ({onPress, onChangeText, value}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
      />
      <View style={styles.searchButtonContainer}>
        <TouchableOpacity onPress={onPress}>
          <AntDesignIcon name="search1" color={lightTheme.primary} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
