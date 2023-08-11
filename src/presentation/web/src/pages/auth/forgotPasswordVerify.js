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
import useResponsive from '../../hooks/useResponsive';
// hooks
import useLocales from '../../hooks/useLocales';
import newpassword from '../../animations/new/buble.json';
import animationSetter from '../../animations/animationSetter';
import loadingAnimation from '../../animations/auth/completeAuth/loading.json';
import SuccessAnimation from '../../animations/auth/completeAuth/successful.json';
import ErrorAnimation from '../../animations/auth/completeAuth/error.json';
// components
import Page from '../../components/Page';
import noTokenApi from '../../store/noTokenApi';
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

export default function ForgotPasswordVerify() {
  const { translate } = useLocales();
  const smDown = useResponsive('down', 'sm');

  const dispatch = useDispatch();
  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const theme = useTheme();
  const [ForgotPasswordVerifyReq, { isLoading }] = noTokenApi.useVerifyPasswordMutation();
  const [OTPAgain, OTPagainResponse] = noTokenApi.useVerifyPasswordMutation();
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
      const EmailOfForgotPassword = localStorage.getItem('forgotPasswordEmail');
      localStorage.setItem('forgotPasswordOtp', values.otp);
      const query = {
        path: '/api/forget/password/otp/verify/',
        data: { email: EmailOfForgotPassword, otp: values.otp },
      };
      const res = await ForgotPasswordVerifyReq(query);
      if (res.error) {
        console.log(res.error);
        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          animation: <Lottie options={animationSetter(ErrorAnimation)} width="12em" height="4em" />,
          message: 'Something Went Wrong !',
          animationPosition: { marginLeft: '-4em' },
        });
      } else if (res.data) {
        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          animation: <Lottie options={animationSetter(SuccessAnimation)} width="12em" height="4em" />,
          message: res.data,
          animationPosition: { marginLeft: '-4em' },
        });
        setTimeout(() => {
          handleNextStep();
        }, 2000);
      }
    },
  });

  const sendOtpAgain = async () => {
    const EmailOfForgotPassword = localStorage.getItem('forgotPasswordEmail');
    const query = {
      path: '/api/forget/password/email/',
      data: { email: 'safiullahjalalzai119@gmail.com' },
    };
    const res = await OTPAgain(query);
    if (res.error) {
      setSnackOptions({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        animation: !smDown ? <Lottie options={animationSetter(ErrorAnimation)} width="12em" height="4em" /> : undefined,
        message: 'something Went Wrong !',
        animationPosition: { marginLeft: !smDown ? '-4em' : undefined },
      });
    } else if (res.data) {
      setSnackOptions({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        animation: !smDown ? (
          <Lottie options={animationSetter(SuccessAnimation)} width="12em" height="4em" />
        ) : undefined,
        message: 'Check Inbox',
        animationPosition: { marginLeft: !smDown ? '-4em' : undefined },
      });
    }
  };

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
        <ContentStyle sx={{ textAlign: 'center', marginTop: '-10em' }}>
          <Box textAlign="center" height={!smDown ? '500px' : '300px'} width={!smDown ? '500px' : '300px'}>
            <Lottie options={animationSetter(newpassword)} isClickToPauseDisabled />
          </Box>
          <Typography mt={-15} variant="h3" paragraph>
            {translate('Check your Inbox !')}
          </Typography>
          <FormProvider onSubmit={handleSubmit}>
            <Stack>
              <TextField
                value={values.otp}
                name="otp"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={translate('OTP')}
                error={formError.otp && touched.otp}
                helperText={formError.otp ? formError.otp : undefined}
                label={translate('OTP')}
              />
              <Button sx={{ marginTop: 1, marginBottom: 1 }} type="submit" fullWidth size="large" variant="contained">
                {isLoading ? (
                  <Lottie options={animationSetter(loadingAnimation)} width={'150px'} height={'150px'} />
                ) : (
                  translate('Confirm')
                )}
              </Button>
              <Button fullWidth size="large" onClick={sendOtpAgain}>
                {OTPagainResponse.isLoading ? (
                  <Lottie options={animationSetter(loadingAnimation)} width={'150px'} height={'150px'} />
                ) : (
                  translate('Resend code')
                )}
              </Button>
            </Stack>
          </FormProvider>
        </ContentStyle>
      </Container>
    </Page>
  );
}
