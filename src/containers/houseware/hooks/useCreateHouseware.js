import {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {noImage} from '../../../constants/string';

export const useCreateHouseware = () => {
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const [post, setPost] = useState({
    owner: userInfo,
    items: [],
    content: '',
    location: '79',
    isActive: true,
  });

  const handleSetPost = useCallback(
    (value, field) => {
      setPost(pre => {
        return {
          ...pre,
          [field]: value,
        };
      });
    },
    [setPost],
  );

  const onChangeContent = useCallback(
    value => {
      handleSetPost(value, 'content');
    },
    [handleSetPost],
  );

  const onChangeCity = useCallback(
    value => {
      handleSetPost(value(), 'location');
    },
    [handleSetPost],
  );

  const onChangeItems = useCallback(
    value => {
      handleSetPost(value, 'items');
    },
    [handleSetPost],
  );

  const onItemChangeValue = useCallback(
    (value, index) => {
      const newValue = [...post.items];
      newValue[index] = value;
      onChangeItems(newValue);
    },
    [onChangeItems, post.items],
  );

  const onRemoveItem = useCallback(
    index => {
      const newValue = [...post.items];
      newValue.splice(index, 1);
      onChangeItems(newValue);
    },
    [onChangeItems, post.items],
  );

  const onAddNewItem = useCallback(() => {
    onChangeItems([
      ...post.items,
      {
        image: noImage,
        price: '',
        description: '',
      },
    ]);
  }, [onChangeItems, post.items]);
  const onPost = () => {
    console.log(post);
  };

  return {
    selectors: {post},
    handlers: {
      onChangeContent,
      onChangeCity,
      onChangeItems,
      onItemChangeValue,
      onAddNewItem,
      onRemoveItem,
      onPost,
    },
  };
};
