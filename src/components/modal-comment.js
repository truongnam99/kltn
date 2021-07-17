import React, {useEffect, useState, memo} from 'react';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {lightTheme} from '../config/theme';
import {selectUserInfo} from '../containers/login/selectors';
import dayjs from 'dayjs';
import {CloseIcon, SendIcon} from './icon';
import {TextInput} from '.';
import {CommentItem} from './comment-item';
import {FlatList} from 'react-native-gesture-handler';
import {Line} from './line';
import {showMessageFail, showMessageInfo} from '../utils/utils';
import {ListEmptyComponent} from './ListEmptyComponent';
import Text from './text/text';
import {globalStyles} from '../global.style';

export const ModalComment = memo(({visible, id, onClose = () => {}}) => {
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState();
  const userInfo = useSelector(selectUserInfo);

  const fetchData = async () => {
    try {
      const doc = await firestore().collection('Comments').doc(id).get();
      if (doc.exists) {
        setComment({items: doc.data().items, id: doc.id});
      }
    } catch (error) {
      console.log(error);
      showMessageInfo('Tạm thời không lấy được các bình luận');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && comment?.id !== id) {
      setComment(null);
      fetchData(id);
    }
  }, [id]);

  const onPost = async () => {
    try {
      if (!id) {
        showMessageFail('Chưa chọn bài viết để comment');
      } else {
        const payload = {
          text,
          by: userInfo,
          at: dayjs().format('DD-MM-YYYY'),
        };
        if (comment) {
          await firestore()
            .collection('Comments')
            .doc(id)
            .update({
              items: firestore.FieldValue.arrayUnion(payload),
            });
          setComment(pre => {
            return {
              ...pre,
              items: [...pre.items, payload],
            };
          });
          setText();
        } else {
          await firestore()
            .collection('Comments')
            .doc(id)
            .set({
              items: [payload],
            });
          setComment({
            id,
            items: [payload],
          });
          setText();
        }
      }
    } catch (error) {
      showMessageFail('Không thể bình luận lúc này');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modal}>
        <View style={styles.modalTop} />
        <View style={styles.modalContainer}>
          <View style={[globalStyles.row, styles.jsp]}>
            <View style={styles.comment}>
              <Text types="h2,bold">Bình luận</Text>
            </View>
            <View style={styles.closeIcon}>
              <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
                <CloseIcon size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            style={styles.body}
            data={comment?.items || []}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <CommentItem user={item.by} text={item.text} at={item.at} />
            )}
            ItemSeparatorComponent={Line}
            ListEmptyComponent={
              <ListEmptyComponent
                loading={loading}
                title="Chưa có bình luận nào"
              />
            }
          />
          <View style={styles.inputTextContainer}>
            <TextInput
              placeholder="nội dung ..."
              containerStyle={styles.textContainerStyle}
              textInputStyle={styles.textInputStyle}
              value={text}
              onChangeText={setText}
              returnKeyType="send"
              onSubmitEditing={onPost}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={onPost}>
              <SendIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#c4c4c44a',
    flex: 1,
  },
  modalTop: {
    flex: 4,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingBottom: 20,
    flex: 6,
  },
  comment: {
    top: 12,
    left: 14,
  },
  closeIcon: {
    borderRadius: 30,
    alignSelf: 'flex-end',
    top: 10,
    right: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: lightTheme.grayC4,
  },
  inputTextContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: lightTheme.grayC4,
    paddingTop: 10,
  },
  textInputStyle: {
    flex: 1,
    width: '100%',
  },
  textContainerStyle: {
    flex: 1,
    marginRight: 10,
  },
  body: {
    padding: 20,
  },
  jsp: {
    justifyContent: 'space-between',
  },
});
