import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRoommate} from '../../store/actions/roommateAction';

const useHook = () => {
  const dispatch = useDispatch();
  const {roommates, isLoading} = useSelector(state => state.roommateReducer);
  const {userInfo} = useSelector(state => state.userReducer);

  const handlePost = async data => {
    await firestore()
      .collection('Roommates')
      .add({
        ...data,
        createdAt: firestore.FieldValue.serverTimestamp(),
        owner: {
          ...userInfo,
        },
      });
  };

  const handleFoundRoommate = async id => {
    await firestore().collection('Roommates').doc(id).update({
      isActive: false,
    });
  };

  const handleFetchRoommate = (props = {reload: false}) => {
    if (isLoading && !props.reload) {
      return;
    }

    dispatch(fetchRoommate(props));
  };
  return {
    handlers: {handlePost, handleFetchRoommate, handleFoundRoommate},
    selectors: {
      roommates,
      userInfo,
      isLoading,
    },
  };
};

export default useHook;
