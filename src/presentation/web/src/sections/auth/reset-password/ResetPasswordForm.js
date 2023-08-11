import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: 'someone@example.com' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {};
  const { translate } = useLocales();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label={translate('Email address')} />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          {translate('send request')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
