import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ContactSupportIcon, LicenseIcon, SettingIcon} from './icon';
import Text from './text/text';
import {Line} from './line';
import {SettingModal} from './setting-modal';
import {TermsAndPoliciesModal} from './terms-and-policies-modal';
import {sendMail} from '../utils/utils';
import {selectUid} from '../containers/login/selectors';
import {useSelector} from 'react-redux';

export const AboutUs = ({}) => {
  const uid = useSelector(selectUid);
  const [openTerm, setOpenTerm] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  return (
    <View style={styles.container}>
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
          activeOpacity={0.8}
          onPress={() =>
            sendMail(
              '[kltn]',
              '---------------------------------------------------\n' +
                uid +
                '\n---------------------------------------------------\n\n',
            )
          }
          style={[styles.row, styles.rowCenter]}>
          <ContactSupportIcon />
          <Text types="h2" style={styles.ml}>
            Liên hệ với chúng tôi
          </Text>
        </TouchableOpacity>
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
    elevation: 1,
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
