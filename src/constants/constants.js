import {translate} from './translate';

export const gender = [
  {value: 1, label: translate.male},
  {value: 0, label: translate.female},
];

export const typeInns = [
  {value: 1, label: 'Trọ riêng'},
  {value: 2, label: 'Ký túc xá'},
  {value: 3, label: 'Ở chung chủ'},
];

export const typeInnsWithAll = [{value: 0, label: 'Tất cả'}, ...typeInns];

export const jobs = [
  {value: 0, label: translate.all},
  {value: 1, label: translate.jobs.student},
  {value: 2, label: translate.jobs.techer},
  {value: 3, label: translate.jobs.officer},
  {value: 4, label: translate.jobs.worker},
];

export const profileJobs = [
  {value: 0, label: translate.others},
  {value: 1, label: translate.jobs.student},
  {value: 2, label: translate.jobs.techer},
  {value: 3, label: translate.jobs.officer},
  {value: 4, label: translate.jobs.worker},
];

export const role = [
  {value: 0, label: translate.lodger},
  {value: 1, label: translate.supplier},
];

export const housewareStatus = [
  {value: true, label: translate.houseware.onSell},
  {value: false, label: translate.houseware.selled},
];

export const getGender = value => {
  return gender.find(item => item.value === value)?.label;
};

export const getJob = value => {
  return jobs.find(item => item.value === value)?.label;
};

export const getProfileJobs = value => {
  return profileJobs.find(item => item.value === value)?.label;
};

export const getRole = value => {
  return role.find(item => item.value === value)?.label;
};

export const getTypeInn = value => {
  return typeInns.find(item => item.value === value)?.label;
};

export const getTypeInnWithAll = value => {
  return typeInnsWithAll.find(item => item.value === value)?.label;
};

export const status = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};
