import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {showMessageFail} from '../../utils/utils';
import {selectUid, selectUserInfo} from '../login/selectors';

export const useReviewHook = reviewId => {
  const [review, setReview] = useState({
    text: '',
    rate: 5,
  });
  const [reviewed, setReviewed] = useState(false);
  const [rate, setRate] = useState(null);
  const [postReviewLoading, setPostReviewLoading] = useState(false);
  const uid = useSelector(selectUid);
  const userInfo = useSelector(selectUserInfo);
  const [offset, setOffset] = useState(5);

  useEffect(() => {
    onFetchReview();
  }, []);

  const onFetchReview = async () => {
    try {
      if (!reviewId) {
        return;
      }
      const result = await firestore()
        .collection('Reviews')
        .doc(reviewId)
        .get();
      if (result.exists) {
        const data = result.data();
        const myReview = data.items?.find(item => {
          return item.userId === uid;
        });
        if (myReview) {
          setReview({
            rate: myReview?.text,
            text: myReview?.rate,
          });
          setReviewed(true);
        }
        setRate(data);
      }
    } catch (error) {
      showMessageFail('Không lấy được dữ liệu đánh giá');
    }
  };

  const onPostReview = async () => {
    try {
      if (!userInfo) {
        throw new Error('Lỗi không có userInfo');
      }
      setPostReviewLoading(true);
      const item = {
        userId: uid,
        text: review.text,
        rate: review.rate,
        user: userInfo,
        reviewAt: dayjs().format('DD-MM-YYYY'),
      };
      if (!rate) {
        await firestore()
          .collection('Reviews')
          .doc(reviewId)
          .set({
            numberOfRate: 1,
            rateAvg: review.rate,
            items: [item],
          });
        setReviewed(true);
        setRate({
          numberOfRate: 1,
          rateAvg: review.rate,
          items: [item],
        });
      } else {
        const totalRate = rate.rateAvg * rate.numberOfRate;
        const rateAvg = (totalRate + review.rate) / (rate.numberOfRate + 1);
        await firestore()
          .collection('Reviews')
          .doc(reviewId)
          .update({
            numberOfRate: rate.numberOfRate + 1,
            rateAvg,
            items: firestore.FieldValue.arrayUnion(item),
          });
        setReviewed(true);
        setRate({
          numberOfRate: 1,
          rateAvg: review.rate,
          items: [item, ...rate.items],
        });
      }
    } catch (error) {
      console.log(error);
      showMessageFail('Lỗi đăng bài đánh giá. Vui lòng thử lại sau');
    } finally {
      setPostReviewLoading(false);
    }
  };

  const onFinishRating = useCallback(number => {
    setReview(pre => ({
      ...pre,
      rate: number,
    }));
  }, []);

  const onShowMore = useCallback(() => {
    setOffset(offset + 10);
  }, [offset]);

  const onChangeTextReview = useCallback(value => {
    setReview(pre => ({
      ...pre,
      text: value,
    }));
  }, []);

  return {
    selectors: {
      offset,
      rate,
      postReviewLoading,
      review,
      reviewed,
    },
    handlers: {
      onPostReview,
      onFinishRating,
      onChangeTextReview,
      onShowMore,
    },
  };
};
