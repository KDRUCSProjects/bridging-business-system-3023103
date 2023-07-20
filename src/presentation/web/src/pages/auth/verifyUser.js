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

// store
import { onNextStep } from '../../store/slices/checkout/checkout';

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
  otp: yup.number().min(6).required(),
});

// ----------------------------------------------------------------------

export default function VerifyUser() {
  const { translate } = useLocales();

  const dispatch = useDispatch();
  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const theme = useTheme();
  const [RegisterUser, { isLoading }] = BaseApi.useRegisterUserMutation();
  const [snackOptions, setSnackOptions] = useState({
    open: false,
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
    otp: null,
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
      const query = {
        path: '/api/users/',
        data: values,
      };
      const res = await RegisterUser(query);
      if (res.error) {
        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.error.main,
          color: theme.palette.text.primary,
          animation: <Lottie options={animationSetter(animation)} width="12em" height="4em" />,
          message: 'Something Went Wrong',
          animationPosition: { marginLeft: '-4em' },
        });
      } else if (res.data) {
        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
          animation: <Lottie options={animationSetter(animation)} width="12em" height="4em" />,
          message: 'User Created SuccessFully !',
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
                helperText={formError.otp ? 'Otp must number & equal to 6 digits' : undefined}
                label="OTP"
              />
              <Button
                sx={{ marginTop: 1, marginBottom: 1 }}
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                onClick={handleNextStep}
              >
                Confirm
              </Button>
            </Stack>
          </FormProvider>
        </ContentStyle>
      </Container>
    </Page>
  );
}
