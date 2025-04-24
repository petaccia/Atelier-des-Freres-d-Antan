import { addLeadingSlash } from './pathUtils';

export const formatFormValues = (values) => {
  return {
    ...values,
    path: addLeadingSlash(values.path),
    parentId: values.parentId ? parseInt(values.parentId) : null,
    showIcon: values.showIcon === 'true'
  };
};

export const getInitialValues = () => ({
  title: '',
  path: '',
  showIcon: 'true',
  parentId: ''
});