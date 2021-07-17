import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {ModalComment} from './modal-comment';

export const CommentContainer = ({children, id}) => {
  const [visible, setVisible] = useState(false);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.75}>
        {children}
      </TouchableOpacity>
      <ModalComment id={id} visible={visible} onClose={onClose} />
    </>
  );
};
