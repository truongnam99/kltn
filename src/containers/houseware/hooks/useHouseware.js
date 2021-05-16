import {useState} from 'react';
import {navigationName} from '../../../constants/navigation';

const posts = [
  {
    id: '13f51asfsdfas',
    owner: {
      displayName: 'Trương Hoàng Nam',
      phoneNumber: '+84949709035',
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/kltn-d14a6.appspot.com/o/images%2Fundefinedoomruhp.jpg?alt=media&token=a11b3bbc-3c84-4f22-b49e-c300e0e7cd68',
      uid: 'aJbsn5oTk4RDBj99htsG7jtboFE2',
    },
    items: [
      {
        image:
          'https://cdn.chotot.com/VZJ_fYbuM1sXnldYoA0E6-YwPXHRlrs1zqjdpYQQsGQ/preset:listing/plain/288ef84ea59673d69abaa1f3149c0bce-2719826327357427633.jpg',
        price: 120000,
        description: 'Còn mới',
      },
    ],
    content:
      'Chào các bạn, mình vừa chuyển trọ nên cần bán một số món đồ sau, ai có nhu cầu thì liên hệ mình nhen. ',
    createdAt: '12:20',
    location: 'TP.HCM',
    isActive: true,
  },
  {
    id: 'piq2pri23p',
    owner: {
      displayName: 'Trương Hoàng Nam',
      phoneNumber: '+84949709035',
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/kltn-d14a6.appspot.com/o/images%2Fundefinedoomruhp.jpg?alt=media&token=a11b3bbc-3c84-4f22-b49e-c300e0e7cd68',
      uid: 'aJbsn5oTk4RDBj99htsG7jtboFE2',
    },
    items: [
      {
        image:
          'https://cdn.chotot.com/VZJ_fYbuM1sXnldYoA0E6-YwPXHRlrs1zqjdpYQQsGQ/preset:listing/plain/288ef84ea59673d69abaa1f3149c0bce-2719826327357427633.jpg',
        price: 'Liên hệ',
        description: 'Còn mới',
      },
      {
        image:
          'https://cdn.chotot.com/VZJ_fYbuM1sXnldYoA0E6-YwPXHRlrs1zqjdpYQQsGQ/preset:listing/plain/288ef84ea59673d69abaa1f3149c0bce-2719826327357427633.jpg',
        price: '131200',
        description: 'Còn mới',
      },
      {
        image:
          'https://cdn.chotot.com/VZJ_fYbuM1sXnldYoA0E6-YwPXHRlrs1zqjdpYQQsGQ/preset:listing/plain/288ef84ea59673d69abaa1f3149c0bce-2719826327357427633.jpg',
        price: 'Liên hệ',
        description: 'Còn mới',
      },
    ],
    content:
      'Chào các bạn, mình vừa chuyển trọ nên cần bán một số món đồ sau, ai có nhu cầu thì liên hệ mình nhen. ',
    createdAt: '12:20',
    location: 'TP.HCM',
    isActive: true,
  },
];
export const useHouseware = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onGotoCreateHouseware = () => {
    navigation.navigate(navigationName.houseware.createHouseware);
  };

  const onGotoMyPost = () => {
    navigation.navigate(navigationName.houseware.myHouseware);
  };

  return {
    selectors: {posts, isLoading},
    handlers: {
      onGotoCreateHouseware,
      onGotoMyPost,
    },
  };
};
