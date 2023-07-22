import * as Yup from 'yup';
import { useCallback, useMemo, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// animation
import Lottie from 'react-lottie';

// router
import { Link, Navigate, useNavigate } from 'react-router-dom';

import useLocales from '../../../hooks/useLocales';
import userAnimation from '../../../animations/profile/116915-waves.json';
import arrow from '../../../animations/new/congruglationyellow.json';
import animation from '../../../animations/shared/arrow-right.json';
import animationSetter from '../../../animations/animationSetter';

// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import Snack from '../../../components/Snack';

import BaseApi from '../../../store/BaseApi';

// ----------------------------------------------------------------------

export default function ProfileForm() {
  const [BusinesProfile, response] = BaseApi.useCreateBusinesProfileMutation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [snackOptions, setSnackOptions] = useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
    backgroundColor: undefined,
    color: undefined,
    animation: undefined,
    message: undefined,
    animationPosition: undefined,
  });
  const handleSnackClose = () => {
    setSnackOptions({ ...snackOptions, open: false });
  };
  const { translate } = useLocales();
  const NewUserSchema = Yup.object().shape({
    province: Yup.string().required('province is required'),
    district: Yup.string().required('district is required'),
    area: Yup.string().required('Area is required'),
    street: Yup.string().required('Street is required'),
    business_name: Yup.string().required('Business Name is required'),
    owner_bio: Yup.string().required('Bio is required'),
    owner_phone: Yup.number().required('phone is required'),
    details: Yup.string().required('Business details is required'),
    business_type: Yup.string().required('Business Type is required'),
    phone: Yup.number().required('phone number is required'),
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });
  const defaultValues = useMemo(
    () => ({
      province: '',
      district: '',
      area: '',
      street: '',
      business_name: '',
      owner_phone: '',
      owner_bio: '',
      phone: '',
      details: '',
      avator: '',
      business_type: '',
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
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  console.log('data', values);
  const onSubmit = async () => {
    const user = localStorage.getItem('userId');
    console.log('user is ', user);
    const data = new FormData();
    data.append('province', values.province);
    data.append('district', values.district);
    data.append('area', values.area);
    data.append('street', values.street);
    data.append('business_name', values.business_name);
    data.append('owner_bio', values.owner_bio);
    data.append('owner_phone', `+93${values.owner_phone}`);
    data.append('detials', values.details);
    data.append('business_type', values.business_type);
    data.append('phone', `+93${values.phone}`);
    data.append('avator', values.avatarUrl);
    data.append('user', user);
    const query = {
      path: '/api/business_profile/',
      data,
    };

    const res = await BusinesProfile(query);
    if (res.error) {
      setSnackOptions({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        backgroundColor: theme.palette.error.main,
        color: theme.palette.text.primary,
        animation: <Lottie options={animationSetter(animation)} width="12em" height="4em" />,
        message: res.error.data,
        animationPosition: { marginLeft: '-4em' },
      });
    } else if (res.data) {
      localStorage.setItem('Token', res.data.token);
      localStorage.setItem('user_id', res.data.verified_user.id);
      console.log(localStorage.getItem('Token'));
      console.log(localStorage.getItem('user_id'));
      setSnackOptions({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        animation: <Lottie options={animationSetter(animation)} width="12em" height="4em" />,
        message: 'successful !',
        animationPosition: { marginLeft: '-4em' },
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  console.log('Response', response);
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
      <Snack
        vertical={snackOptions.vertical}
        horizontal={snackOptions.horizontal}
        open={snackOptions.open}
        onClose={handleSnackClose}
        message={snackOptions.message}
        animation={snackOptions.animation}
        autoHideDuration={5000}
        backgroundColor={snackOptions.backgroundColor}
        color={snackOptions.color}
        animationPosition={snackOptions.animationPosition}
      />
      <Grid container spacing={3} mb="3em">
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box mt="-3em">
              <Lottie options={animationSetter(userAnimation)} />
            </Box>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar name="avator" maxSize={3145728} onDrop={handleDrop} />
            </Box>
            <Box>
              <Typography sx={{ color: 'primary.main' }}>{translate('upload image')}</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 10, marginBottom: '3em' }}>
            <Button
              component={Link}
              to={'/'}
              sx={{ position: 'absolute', top: '2%', right: '1%' }}
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {translate('Skip')}
              <Lottie options={animationSetter(arrow)} width={'3em'} height={'2em'} />
            </Button>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="province" label={translate('province')} />
              <RHFTextField name="district" label={translate('District')} />
              <RHFTextField name="area" label={translate('Area')} />
              <RHFTextField name="street" label={translate('Street')} />
              <RHFTextField name="business_name" label={translate('Business Name')} />
              <RHFTextField name="owner_phone" label={translate('Owner phone')} />
              <RHFTextField name="owner_bio" label={translate('Owner Bio')} />
              <RHFTextField name="details" label={translate('Details')} />
              <RHFTextField name="phone" label={translate('Phone')} />
              {/* <RHFSelect name="country" label={translate('Country')} placeholder="Country"> */}
              {/* <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect> */}

              <RHFTextField name="business_type" label={translate('Business Type')} />
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {translate('create user')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
