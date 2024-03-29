import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  MenuOption,
  MenuOptions,
  MenuTrigger,
  Menu,
} from 'react-native-popup-menu';
import dayjs from 'dayjs';

import styles from './cart-item.style';
import {translate} from '../../../constants/translate';
import {getGender, getJob} from '../../../constants/constants';
import {Contact} from './contact';
import {navigationName} from '../../../constants/navigation';
import {activeOpacity} from '../../../components/shared';
import Text from '../../../components/text/text';
import {Image} from '../../../components';
import {GenderIcon, JobIcon, ReportIcon} from '../../../components/icon';
import {shortenDistrictName} from '../../../utils/utils';
import {ReportContainer} from '../../../components/report-container';

const maxNumberOfLines = 5;

const CartItem = ({
  id,
  owner,
  content,
  userInfo,
  onFoundRoommate,
  isActive,
  showIsActive = false,
  onUpdate,
  createdAt,
  district,
  onOpenCommentModal,
  ...props
}) => {
  const districtName = shortenDistrictName(district.Name);
  const [state, setState] = useState({
    baseLine: -1,
    isShowSeeMore: false,
    numberOfLines: undefined,
  });

  const onTextLayout = e => {
    if (state.baseLine !== -1) {
      return;
    }
    if (e.nativeEvent.lines.length && state.baseLine === -1) {
      if (e.nativeEvent.lines.length > maxNumberOfLines) {
        setState({
          numberOfLines: maxNumberOfLines,
          isShowSeeMore: true,
          baseLine: e.nativeEvent.lines.length,
        });
      } else {
        setState({
          ...state,
          baseLine: e.nativeEvent.lines.length,
        });
      }
    }
  };

  const onSetNumberOfLine = () => {
    setState({
      isShowSeeMore: false,
      numberOfLines: undefined,
    });
  };

  const onViewProfile = () => {
    props?.navigation.navigate(navigationName.roommate.profile, {
      profile: owner,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={activeOpacity} onPress={onViewProfile}>
          <View style={styles.userContainer}>
            <Image
              image={owner.photoURL}
              style={styles.avatar}
              isAvata={true}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{owner.displayName}</Text>
              <Text style={styles.activeText}>
                {dayjs(createdAt?.toDate()).format('DD/MM/YYYY')}
                {districtName && (
                  <>
                    <Text style={styles.dot}> · </Text>
                    {districtName}
                  </>
                )}
                {showIsActive && (
                  <>
                    <Text style={styles.dot}> · </Text>
                    {isActive
                      ? translate.roommate.finding
                      : translate.roommate.found}
                  </>
                )}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {userInfo.uid === owner.uid ? (
          <Menu>
            <MenuTrigger>
              <MaterialCommunityIcons name="dots-horizontal" size={24} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                text={
                  isActive
                    ? translate.roommate.foundRoommate
                    : translate.roommate.findingRoomate
                }
                onSelect={() => onFoundRoommate(id, !isActive)}
              />
              <MenuOption
                text="Chỉnh sửa"
                onSelect={() => onUpdate(props.item)}
              />
            </MenuOptions>
          </Menu>
        ) : (
          <ReportContainer collection="Roommates" id={id}>
            <ReportIcon size={20} />
          </ReportContainer>
        )}
      </View>
      <Text
        style={styles.content}
        numberOfLines={state.numberOfLines}
        onTextLayout={onTextLayout}>
        {content}
        {getGender(props.gender) && (
          <Text>
            {'\n'} <JobIcon size={16} />
            {`${getJob(props.job)}`}
          </Text>
        )}
        {getGender(props.gender) && (
          <Text>
            {'\n'}
            <GenderIcon size={18} />
            {`${getGender(props.gender)}`}
          </Text>
        )}
        {props.age && props.age.length && (
          <Text>{`\nTuổi từ: ${props.age[0]} - ${props.age[1]}`}</Text>
        )}
        {props.haveInnContent && (
          <Text>
            {props.innName && <Text>{'\nTên trọ: ' + props.innName}</Text>}
            {props.innOwner && <Text>{'\nChủ trọ: ' + props.innOwner}</Text>}
            {props.innPrice && <Text>{'\nGiá: ' + props.innPrice}</Text>}
            {props.innAddress && (
              <Text>{'\nĐịa chỉ: ' + props.innAddress}</Text>
            )}
            {props.innWaterPrice && (
              <Text>{'\nTiền nước: ' + props.innWaterPrice}</Text>
            )}
            {props.innElectricPrice && (
              <Text>{'\nTiền điện:' + props.innElectricPrice}</Text>
            )}
            {props.innArea && <Text>{'\n' + props.innArea}</Text>}
            {props.innDeposit && <Text>{'\n' + props.innDeposit}</Text>}
          </Text>
        )}
      </Text>
      <TouchableOpacity onPress={() => onSetNumberOfLine()}>
        {state.isShowSeeMore && (
          <Text style={styles.seeMore}>{translate.seeMore}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.line}>
        <Contact
          navigation={props.navigation}
          owner={owner}
          id={id}
          onOpenCommentModal={onOpenCommentModal}
        />
      </View>
    </View>
  );
};

export default CartItem;
