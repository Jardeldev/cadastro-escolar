import institutions from '@/data/institutions';
import schools from '@/data/schools';
import series from '@/data/series';
import classes from '@/data/classes';
import turmas from '@/data/turmas';

export const fetchInstitutions = () => {
  return institutions;
};

export const fetchSchools = () => {
  return schools;
};

export const fetchSeries = () => {
  return series;
};

export const fetchClasses = () => {
  return classes;
};

export const fetchTurmas = () => {
  return turmas;
};
