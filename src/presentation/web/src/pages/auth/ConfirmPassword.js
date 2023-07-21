import { useState } from 'react';
// formit and yup
import * as yup from 'yup';
import { useFormik } from 'formik';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Button, Container, Typography, Box, TextField, Stack } from '@mui/material';
// Lottie
import Lottie from 'react-lottie';
import { FormProvider } from '../../components/hook-form';
// hooks
import useLocales from '../../hooks/useLocales';
import confirmpasswordanimation from '../../animations/auth/code1.json';
import animationSetter from '../../animations/animationSetter';
import animation from '../../animations/shared/arrow-left.json';

// redux
import { useDispatch, useSelector } from '../../store/store';

// components
import Page from '../../components/Page';
import Snack from '../../components/Snack';
import BaseApi from '../../store/BaseApi';

// store
import { onNextStep } from '../../store/slices/auth/completeAuth';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const ConfirmPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character or @'
    ),
  confirmPassowrd: yup
    .string()
    .required('Please enter your password')
    .oneOf([yup.ref('password'), null], 'Password Must Match'),
});

// ----------------------------------------------------------------------

export default function ConfirmPassowrd() {
  const [NewPassword, newPasswordResponse] = BaseApi.useNewPasswordMutation();

  const { translate } = useLocales();

  const dispatch = useDispatch();
  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const theme = useTheme();
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
    password: undefined,
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
    validationSchema: ConfirmPasswordSchema,
    onSubmit: async () => {
      const EmailOfForgotPassword = localStorage.getItem('forgotPasswordEmail');
      const ForgotPasswordOtp = localStorage.getItem('forgotPasswordOtp');
      const query = {
        path: '/api/change/password/',
        data: { email: EmailOfForgotPassword, otp: ForgotPasswordOtp, password: values.password },
      };

      const res = await NewPassword(query);
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
        console.log(res.data);
        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
          animation: <Lottie options={animationSetter(animation)} width="12em" height="4em" />,
          message: res.data,
          animationPosition: { marginLeft: '-4em' },
        });
        setTimeout(() => {
          handleNextStep();
        }, 2000);
      }
    },
  });
  console.log(values.password);

  return (
    <Page title="Confirm Password">
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
          <Box mb={8} textAlign="center" height="200px">
            <Lottie options={animationSetter(confirmpasswordanimation)} isClickToPauseDisabled />
          </Box>
          <Typography mt={-5} variant="h3" paragraph>
            {translate('Enter One Time Passoword')}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            {translate('A one time password has been sent to your Email Address.')}
          </Typography>
          <FormProvider onSubmit={handleSubmit}>
            <Stack>
              <TextField
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder=" New Password"
                error={formError.password && touched.password}
                helperText={formError.password ? formError.password : undefined}
                label="New Password"
                sx={{ marginBottom: '1em' }}
              />
              <TextField
                value={values.confirmPassowrd}
                name="confirmPassowrd"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Confirm Passowrd"
                error={formError.confirmPassowrd && touched.confirmPassowrd}
                helperText={formError.confirmPassowrd ? formError.confirmPassowrd : undefined}
                label="Confirm Password"
              />
              <Button sx={{ marginTop: 1, marginBottom: 1 }} type="submit" fullWidth size="large" variant="contained">
                {translate('Confirm')}
              </Button>
            </Stack>
          </FormProvider>
        </ContentStyle>
      </Container>
    </Page>
  );
}
