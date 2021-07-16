import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ContactSupportIcon,
  FeedbackIcon,
  LicenseIcon,
  SettingIcon,
} from './icon';
import Text from './text/text';
import {Line} from './line';
import {SettingModal} from './setting-modal';
import {TermsAndPoliciesModal} from './terms-and-policies-modal';

export const AboutUs = ({}) => {
  const [openTerm, setOpenTerm] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.rowCenter]}>
        <FeedbackIcon />
        <Text types="h2" style={styles.ml}>
          Phản hồi
        </Text>
      </View>
      <Line />
      <View>
        <TouchableOpacity
          onPress={() => setOpenTerm(true)}
          activeOpacity={0.8}
          style={[styles.row, styles.rowCenter]}>
          <LicenseIcon />
          <Text types="h2" style={styles.ml}>
            Điều khoản và chính sách
          </Text>
        </TouchableOpacity>
      </View>
      <Line />
      <View>
        <TouchableOpacity
          onPress={() => setOpenSetting(true)}
          activeOpacity={0.8}
          style={[styles.row, styles.rowCenter]}>
          <SettingIcon />
          <Text types="h2" style={styles.ml}>
            Thiết lập
          </Text>
        </TouchableOpacity>
      </View>
      <Line />
      <View style={[styles.row, styles.rowCenter]}>
        <ContactSupportIcon />
        <Text types="h2" style={styles.ml}>
          Thông tin liên hệ với chúng tôi
        </Text>
      </View>
      <View style={styles.ml}>
        <Text>Số ĐT: 0949 709 036</Text>
        <Text>Email: 17520784@gm.uit.edu.vn</Text>
      </View>
      <TermsAndPoliciesModal
        visible={openTerm}
        onClose={() => setOpenTerm(false)}
      />
      <SettingModal
        visible={openSetting}
        onClose={() => setOpenSetting(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    alignItems: 'center',
  },
  ml: {
    marginLeft: 6,
  },
});
