import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {ModalReport} from './modal-report';

export const ReportContainer = ({children, id, collection}) => {
  const [visible, setVisible] = useState(false);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.75}>
        {children}
      </TouchableOpacity>
      <ModalReport
        id={id}
        collection={collection}
        visible={visible}
        onClose={onClose}
      />
    </>
  );
};
