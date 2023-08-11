import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { m } from 'framer-motion';

// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// yup & formik
import * as yup from 'yup';
import { useFormik } from 'formik';

// redux
import { useDispatch } from 'react-redux';

// /lottie
import Lottie from 'react-lottie';
import { FormProvider } from '../../components/hook-form';
import { MotionContainer, varBounce } from '../../components/animate';
import useResponsive from '../../hooks/useResponsive';
import register from '../../animations/auth/completeAuth/email1.json';
import Email from '../../animations/auth/completeAuth/email3.json';
import EmailError from '../../animations/auth/completeAuth/error.json';
import EmailSuccess from '../../animations/auth/completeAuth/email2.json';
// animation
import animationSetter from '../../animations/animationSetter';
import animation from '../../animations/shared/hms-loading.json';

// hooks
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import Snack from '../../components/Snack';

// store
import noTokenApi from '../../store/noTokenApi';
import { onNextStep } from '../../store/slices/auth/completeForgotPassword';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '600px',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  marginTop: '-3em',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const RegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function Register() {
  const { translate } = useLocales();
  const smUp = useResponsive('up', 'sm');
  const smDown = useResponsive('down', 'sm');

  const mdUp = useResponsive('up', 'md');

  // start

  const dispatch = useDispatch();
  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const theme = useTheme();
  const [ForgotPasswordEmail, response] = noTokenApi.useForgotPasswordEmailMutation();

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

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
  };
  const [userAllErrors, setUserAllErrors] = useState();
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
        path: '/api/forget/password/email/',
        data: values,
      };
      const res = await ForgotPasswordEmail(query);
      if (res.error) {
        setUserAllErrors(res.error.data);
        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.error.main,
          animation: !smDown ? <Lottie options={animationSetter(EmailError)} width="12em" height="4em" /> : undefined,
          message: 'something Went Wrong',
          animationPosition: { marginLeft: !smDown ? '-4em' : undefined },
        });
      } else if (res.data) {
        localStorage.setItem('forgotPasswordEmail', values.email);
        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.success.main,
          animation: !smDown ? <Lottie options={animationSetter(EmailSuccess)} width="12em" height="4em" /> : undefined,
          message: res.data,
          animationPosition: { marginLeft: !smDown ? '-4em' : undefined },
        });
        setTimeout(() => {
          handleNextStep();
        }, 3000);
      }
    },
  });

  return (
    <Page title="forgot-Password-1">
      <RootStyle>
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

        <HeaderStyle>
          {smUp && (
            <Typography variant="body2" sx={{ mt: 15 }}>
              {translate('Already have an account?')} {''}
              <Link variant="subtitle2" component={RouterLink} to={'/user/login'}>
                {translate('login')}
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Lottie options={animationSetter(register)} width={'100%'} height={'50%'} />
          </SectionStyle>
        )}

        <Container>
          {smDown && (
            <Typography variant="body2" sx={{ mt: { md: 13 } }}>
              {translate('Already have an account?')} {''}
              <Link variant="subtitle2" component={RouterLink} to={'/user/login'}>
                {translate('login')}
              </Link>
            </Typography>
          )}
          <ContentStyle>
            <Lottie options={animationSetter(Email)} width={'250px'} height={'250px'} />
            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" textAlign="center">
                  {translate('Enter Your Email')}
                </Typography>
              </Box>
            </Box>

            {/* start */}
            <Container component={MotionContainer}>
              {userAllErrors &&
                Object.keys(userAllErrors).map((error) => (
                  <Typography textAlign="center" color={theme.palette.error.main} variant="subtitle2">
                    {userAllErrors[error]}
                  </Typography>
                ))}

              <m.div variants={varBounce().inLeft}>
                <FormProvider onSubmit={handleSubmit} autocomplete={'off'}>
                  {smDown ? (
                    <Stack sx={{ width: '100%' }}>
                      <m.div variants={varBounce().inLeft}>
                        <TextField
                          sx={{ mb: '2em' }}
                          fullWidth
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={translate('Email Address')}
                          error={formError.email && touched.email}
                          helperText={formError.email}
                          name="email"
                          label={translate('Email Address')}
                        />
                      </m.div>

                      <m.div variants={varBounce().inDown}>
                        <LoadingButton fullWidth size="large" type="submit" variant="contained">
                          {response.isLoading ? (
                            <Lottie options={animationSetter(animation)} width="15em" height="10em" />
                          ) : (
                            'Register'
                          )}
                        </LoadingButton>
                      </m.div>
                    </Stack>
                  ) : (
                    <Stack>
                      <m.div variants={varBounce().inLeft}>
                        <TextField
                          sx={{ mb: '2em' }}
                          fullWidth
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={translate('Email Address')}
                          error={formError.email && touched.email}
                          helperText={formError.email}
                          name="email"
                          label={translate('Email Address')}
                        />
                      </m.div>
                      <m.div variants={varBounce().inDown}>
                        <LoadingButton fullWidth size="large" type="submit" variant="contained">
                          {response.isLoading ? (
                            <Lottie options={animationSetter(animation)} width="15em" height="10em" />
                          ) : (
                            'Register'
                          )}
                        </LoadingButton>
                      </m.div>
                    </Stack>
                  )}
                </FormProvider>
              </m.div>
            </Container>

            {/* end */}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
