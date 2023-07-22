import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

// Formik & yep
import * as yup from 'yup';
import { useFormik } from 'formik';

import { Button, Container, Typography, Box, TextField, Stack, useTheme } from '@mui/material';
// Lottie
import Lottie from 'react-lottie';
import { FormProvider } from '../../components/hook-form';
// hooks
import useLocales from '../../hooks/useLocales';
import newpassword from '../../animations/new/buble.json';
import animationSetter from '../../animations/animationSetter';
import animation from '../../animations/shared/arrow-left.json';
// components
import Page from '../../components/Page';
import BaseApi from '../../store/BaseApi';
import Snack from '../../components/Snack';

// store
import { onNextStep } from '../../store/slices/auth/completeAuth';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const RegisterSchema = yup.object().shape({
  otp: yup
    .string('otp must be number')
    .required('Please enter Otp')
    .matches(/^\d{4}$/, '4 digit required')
    .length(4, 'please Enter exactly 4 digit !'),
});

// ----------------------------------------------------------------------

export default function VerifyUser() {
  const { translate } = useLocales();

  const dispatch = useDispatch();
  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const theme = useTheme();
  const [UserVerify, { isLoading }] = BaseApi.useVerifyUserMutation();
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

  const initialValues = {
    otp: undefined,
  };

  const {
    values,
    errors: formError,
    handleBlur,
    touched,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const email = localStorage.getItem('userEmail');
      const data = { otp: values.otp, email };
      const query = {
        path: '/api/verify/',
        data,
      };
      const res = await UserVerify(query);
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
          handleNextStep();
        }, 2000);
      }
    },
  });

  return (
    <Page title="Verify User">
      <Container>
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
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Box mb={8} textAlign="center" height="300px" width={'500px'}>
            <Lottie options={animationSetter(newpassword)} />
          </Box>
          <Typography mt={-5} variant="h3" paragraph>
            {translate('Enter OTP !')}
          </Typography>
          <FormProvider onSubmit={handleSubmit}>
            <Stack>
              <TextField
                value={values.otp}
                name="otp"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="OTP"
                error={formError.otp && touched.otp}
                helperText={formError.otp ? formError.otp : undefined}
                label="OTP"
              />
              <Button sx={{ marginTop: 1, marginBottom: 1 }} type="submit" fullWidth size="large" variant="contained">
                {isLoading ? <Lottie options={animationSetter(animation)} /> : ' Confirm'}
              </Button>
            </Stack>
          </FormProvider>
        </ContentStyle>
      </Container>
    </Page>
  );
}
