import {translate} from './translate';

export const gender = [
  {value: 1, label: translate.male},
  {value: 0, label: translate.female},
];

export const jobs = [
  {value: 0, label: translate.all},
  {value: 1, label: translate.jobs.student},
  {value: 2, label: translate.jobs.techer},
  {value: 3, label: translate.jobs.officer},
  {value: 4, label: translate.jobs.worker},
];

export const getGender = value => {
  return gender.find(item => item.value === value)?.label;
};

export const getJob = value => {
  return jobs.find(item => item.value === value)?.label;
};
