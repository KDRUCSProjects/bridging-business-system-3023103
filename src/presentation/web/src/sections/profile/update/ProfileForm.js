import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// animation
import Lottie from 'react-lottie';
import userAnimation from '../../../animations/profile/update/cosmos-planets.json';
import animationSetter from '../../../animations/animationSetter';
// fake-db
import { countries } from '../../../@fake-db';
// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

export default function ProfileForm() {
  const {translate}= useLocales();
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });
  const defaultValues = useMemo(
    () => ({
      name: 'Adiljan',
      email: 'wahab.cs238@gmail.com',
      phoneNumber: '0745180238',
      address: 'helmand-afghanistan',
      country: 'afghanistan',
      state: 'helmand',
      city: 'lash-kargah',
      zipCode: '1000',
      avatarUrl: 'this is link of the Avatar',
      isVerified: true,
      status: 'single',
      company: 'No company',
      role: 'Admin',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async () => {};
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} mb="3em">
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box mt="-5em" mb="-5em">
              <Lottie options={animationSetter(userAnimation)} />
            </Box>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar name="avatarUrl" maxSize={3145728} onDrop={handleDrop} />
            </Box>
            <Box>
              <Typography sx={{ color: 'primary.main' }}>{translate('Upload Image')}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label={translate("Full Name")} />
              <RHFTextField name="email" label={translate("Email Address")} />
              <RHFTextField name="phoneNumber" label={translate("Phone Number")} />

              <RHFSelect name="country" label={translate("Country")} placeholder={translate("Country")}>
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="state" label={translate("State/Region")} />
              <RHFTextField name="city" label={translate("City")} />
              <RHFTextField name="address" label={translate("Address")} />
              <RHFTextField name="zipCode" label={translate("Zip/Code")} />
              <RHFTextField name="company" label={translate("Company")} />
              <RHFTextField name="role" label={translate("Role")} />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {translate('Create User')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
