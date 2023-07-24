import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';

import BaseApi from '../../../../store/BaseApi';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const [Resetpassword] = BaseApi.useResetpasswordMutation();

  const ChangePassWordSchema = Yup.object().shape({
    user_id: Yup.number().required('quantity is required'),
    old_password: Yup.string()
      .required('Please enter your password')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character or @'
      ),
    password1: Yup.string()
      .required('Please enter your password')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character or @'
      ),
    password2: Yup.string()
      .required('Please enter your password')
      .oneOf([Yup.ref('password1'), null], 'Password Must Match'),
  });
  const userId = localStorage.getItem('userId');

  const defaultValues = {
    user_id: Number(userId),
    old_password: '',
    password1: '',
    password2: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const values = watch();

  const onSubmit = async () => {
    const query = {
      path: '/api/reset/password/',
      data: values,
    };
    const res = await Resetpassword(query);
    if (res.error) {
      enqueueSnackbar('error', { variant: 'error' });
    } else if (res.data) {
      enqueueSnackbar('Update success!');
      reset();
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="old_password" type="password" label="Old Password" />

          <RHFTextField name="password1" type="password" label="New Password" />

          <RHFTextField name="password2" type="password" label="Confirm New Password" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
