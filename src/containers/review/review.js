import React, {useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Button, Image, Text} from '../../components';
import TextInput from '../../components/text-input/text-input';
import {styles} from './review.style';
import {useReviewHook} from './useReviewHook';

export const Review = ({reviewId, containerStyle}) => {
  const {selectors, handlers} = useReviewHook(reviewId);
  const {rate, postReviewLoading, reviewed, review, offset} = selectors;
  const {
    onPostReview,
    onFinishRating,
    onChangeTextReview,
    onShowMore,
  } = handlers;

  const _renderReviewItems = useCallback(() => {
    if (!rate?.items?.length) {
      return null;
    }
    const renderItem = rate?.items?.slice(0, offset);
    return (
      <>
        <View style={[styles.mt]}>
          <Text types="bold,h2">Bài đánh giá</Text>
        </View>
        {renderItem?.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.row}>
                <Image
                  image={item.user.photoURL}
                  isAvata={true}
                  style={styles.avata}
                />
                <View>
                  <Text>{item.user.displayName}</Text>
                  <View style={styles.row}>
                    <Rating
                      ratingCount={5}
                      startingValue={item.rate}
                      imageSize={16}
                      readonly={true}
                    />
                    <Text style={[styles.ml, styles.reviewAt]}>
                      {item.reviewAt}
                    </Text>
                  </View>
                </View>
              </View>
              {item.text && (
                <View>
                  <Text style={styles.fz}>{item.text}</Text>
                </View>
              )}
            </View>
          );
        })}
        {renderItem?.length < rate?.items?.length && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onShowMore}
            style={styles.center}>
            <Text style={styles.seeMore}>Xem thêm...</Text>
          </TouchableOpacity>
        )}
      </>
    );
  }, [rate?.items, offset, onShowMore]);

  const _renderWriteReview = useCallback(() => {
    if (reviewed) {
      return (
        <>
          <Text types="bold,h2">Viết đánh giá</Text>
          <Text types="italic">Bạn đã viết đánh giá rồi!</Text>
        </>
      );
    }
    return (
      <>
        <Text types="bold,h2">Viết đánh giá</Text>
        <AirbnbRating
          count={5}
          reviews={['Rât tệ', 'Tệ', 'Bình thường', 'Tốt', 'Rất tốt']}
          defaultRating={review.rate}
          size={24}
          reviewSize={16}
          onFinishRating={onFinishRating}
        />
        <View style={styles.mt}>
          <TextInput
            type="outlined"
            height={120}
            numberOfLines={5}
            multiline={true}
            textInputStyle={styles.reviewText}
            onChangeText={onChangeTextReview}
          />
        </View>
        <Button
          title="Đăng"
          containerStyle={styles.mt}
          loading={postReviewLoading}
          onPress={onPostReview}
        />
      </>
    );
  }, [
    review,
    reviewed,
    postReviewLoading,
    onPostReview,
    onFinishRating,
    onChangeTextReview,
  ]);

  const _renderResutlReview = useCallback(() => {
    if (!rate?.items?.length) {
      return (
        <>
          <Text types="bold,h2">Đánh giá</Text>
          <Text types="italic">Chưa có bài đánh giá nào!</Text>
        </>
      );
    }
    return (
      <>
        <Text types="bold,h2" style={styles.mb}>
          Đánh giá
        </Text>
        <View style={styles.ratingResultContainer}>
          <Rating
            ratingCount={5}
            startingValue={rate?.rateAvg?.toFixed(1)}
            imageSize={28}
            readonly={true}
          />
          <Text style={styles.textRatingResult}>{rate?.rateAvg}/5</Text>
          <Text style={styles.numberOfRate}>
            {' (' + rate?.numberOfRate + ' lượt)'}{' '}
          </Text>
        </View>
      </>
    );
  }, [rate]);

  return (
    <View style={[styles.container, containerStyle]}>
      {_renderResutlReview()}
      {_renderWriteReview()}
      {_renderReviewItems()}
    </View>
  );
};
