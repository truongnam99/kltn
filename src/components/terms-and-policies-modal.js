import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {lightTheme} from '../config/theme';
import {globalStyles} from '../global.style';
import {termsAndPolicies} from '../termsAndPolicies';
import Text from './text/text';

export const TermsAndPoliciesModal = ({visible, onClose}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text types="bold,h2" style={globalStyles.modalHeader}>
            Điều khoản và chính sách ứng dụng
          </Text>
          <ScrollView>
            <Text>{termsAndPolicies}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.buttonAcceptTerm} onPress={onClose}>
            <Text style={styles.textAcceptTerm}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#c4c4c4a4',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    marginVertical: 50,
    padding: 10,
    borderRadius: 8,
  },
  buttonAcceptTerm: {
    backgroundColor: lightTheme.grayC4,
    paddingVertical: 8,
    borderRadius: 4,
    paddingHorizontal: 6,
    marginTop: 10,
    width: 120,
    alignItems: 'center',
  },
});
