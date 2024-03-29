import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { m } from 'framer-motion';
// Lottie
import Lottie from 'react-lottie';

// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, IconButton, InputAdornment, TextField, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Formik & yep
import * as yup from 'yup';
import { useFormik } from 'formik';

// animation
import animationSetter from '../../../animations/animationSetter';
import SuccessAnimation from '../../../animations/auth/completeAuth/successful.json';
import LoadingAnimation from '../../../animations/auth/login/loginLoading.json';
import ErrorAnimation from '../../../animations/auth/completeAuth/error.json';

// components
import Iconify from '../../../components/Iconify';
import Snack from '../../../components/Snack';
import useResponsive from '../../../hooks/useResponsive';
import { FormProvider } from '../../../components/hook-form';
import { MotionContainer, varBounce } from '../../../components/animate';
// store
import BaseApi from '../../../store/BaseApi';
import useLocales from '../../../hooks/useLocales';
// store
import { onNextStep } from '../../../store/slices/auth/completeAuth';
// import { chatCredientialsActions } from '../../../store/slices/chat';

// ----------------------------------------------------------------------
const RegisterSchema = yup.object().shape({
  username: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character or @'
    ),
});

export default function RegisterForm() {
  const dispatch = useDispatch();
  const handleNextStep = () => {
    dispatch(onNextStep());
  };
  const isMobile = useResponsive('down', 'sm');

  const theme = useTheme();
  const [RegisterUser, response] = BaseApi.useRegisterUserMutation();

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
  const registerobj = 'Register';
  const { translate } = useLocales();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
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
        path: '/api/users/',
        data: values,
      };
      // const chatInfo = {
      //   firstname: values.first_name,
      //   lastname: values.last_name,
      //   email: values.email,
      //   password: values.password,
      //   confirmPassword: values.password,
      // };

      // dispatch(chatCredientialsActions.setChatInfo(chatInfo));
      const res = await RegisterUser(query);
      if (res.error) {
        setUserAllErrors(res.error.data);
        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          animation: <Lottie options={animationSetter(ErrorAnimation)} width="12em" height="4em" />,
          message: 'Something Went Wrong',
          animationPosition: { marginLeft: '-4em' },
        });
      } else if (res.data) {
        localStorage.setItem('userEmail', res.data.user_info.email);
        localStorage.setItem('userName', res.data.user_info.username);
        localStorage.setItem('userId', res.data.user_info.id);

        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          animation: <Lottie options={animationSetter(SuccessAnimation)} width="12em" height="4em" />,
          message: res.data.description,
          animationPosition: { marginLeft: '-4em' },
        });
        setTimeout(() => {
          handleNextStep();
        }, 2000);
      }
    },
  });

  return (
    <Container component={MotionContainer}>
      {userAllErrors &&
        Object.keys(userAllErrors).map((error, key) => (
          <Typography key={key + error} textAlign="center" color={theme.palette.error.main} variant="subtitle2">
            {userAllErrors[error]}
          </Typography>
        ))}

      <m.div variants={varBounce().inLeft}>
        <FormProvider onSubmit={handleSubmit} autocomplete={'off'}>
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

          <Stack spacing={3} mt={userAllErrors ? '1em' : undefined}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <m.div variants={varBounce().inRight}>
                <TextField
                  fullWidth={isMobile}
                  value={values.username}
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={translate('UserName')}
                  error={formError.username && touched.username}
                  helperText={formError.username}
                  label={translate('UserName')}
                />
              </m.div>
              <m.div variants={varBounce().inLeft}>
                <TextField
                  fullWidth={isMobile}
                  value={values.first_name}
                  name="first_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={translate('First Name')}
                  error={formError.first_name && touched.first_name}
                  helperText={formError.first_name}
                  label={translate('First Name')}
                />
              </m.div>
            </Stack>
            <m.div variants={varBounce().inRight}>
              <TextField
                fullWidth
                value={values.last_name}
                name="last_name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={translate('last Name')}
                error={formError.last_name && touched.last_name}
                helperText={formError.last_name}
                label={translate('last Name')}
              />
              <m.div
                value={values.last_name}
                name="last_name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="last Name"
                error={formError.last_name && touched.last_name}
                helperText={formError.last_name}
                label="Last Name"
              />
            </m.div>
            <m.div variants={varBounce().inLeft}>
              <TextField
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
            <m.div variants={varBounce().inUp}>
              <TextField
                fullWidth
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={translate('password')}
                error={formError.password && touched.password}
                helperText={formError.password}
                name="password"
                label={translate('Password')}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </m.div>
            <m.div variants={varBounce().inDowm}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                {response.isLoading ? (
                  <Lottie options={animationSetter(LoadingAnimation)} width="10em" height="10em" />
                ) : (
                  'Register'
                )}
              </LoadingButton>
            </m.div>
          </Stack>
        </FormProvider>
      </m.div>
    </Container>
  );
}
