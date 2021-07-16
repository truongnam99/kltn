import React from 'react';
import {ScrollView} from 'react-native';
import {ConfirmBox} from '../../../components';

import useHooks from '../hooks';
import styles from './profile.style';
import {ViewProfile} from '../../../components/view-profile';
import {LogoutButton} from '../../../components/logout-button';
import {AboutUs} from '../../../components/about-us';
import {ModalUpdateProfile} from '../../../components/modal-update-profile';

const Profile = ({navigation, route}) => {
  const {selectors, handlers} = useHooks({navigation, route});
  const {
    isMe,
    user,
    editable,
    updateValue,
    loading,
    showConfirmLogout,
  } = selectors;
  const {
    onOpenEdit,
    onCancel,
    onUpdateProfile,
    onShowConfirmLogoutBox,
    pickImage,
    updateProfile,
    onConfirmLogout,
    onCancelLogout,
  } = handlers;

  return (
    <ScrollView style={styles.container}>
      <ViewProfile user={user} isMe={!isMe} openUpdateProfile={onOpenEdit} />
      {!isMe && (
        <>
          <AboutUs />
          <LogoutButton onPress={onShowConfirmLogoutBox} />
        </>
      )}
      <ModalUpdateProfile
        visible={editable}
        onClose={onCancel}
        updateValue={updateValue}
        pickImage={pickImage}
        onSave={updateProfile}
        onUpdateProfile={onUpdateProfile}
        loading={loading}
      />
      <ConfirmBox
        title="Bạn có muốn đăng xuất không"
        onConfirm={onConfirmLogout}
        onCancel={onCancelLogout}
        visible={showConfirmLogout}
      />
    </ScrollView>
  );
};

export default Profile;
