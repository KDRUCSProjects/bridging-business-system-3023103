import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// Lottie
import Lottie from 'react-lottie';

// @mui
import { useTheme } from '@mui/material/styles';
import { Button, Link, Stack, IconButton, InputAdornment, Alert, TextField } from '@mui/material';
// import { LoadingButton } from '@mui/lab';

// Formik & yup
import * as yup from 'yup';
import { useFormik } from 'formik';
import BaseApi from '../../../store/BaseApi';
// animation
import animationSetter from '../../../animations/animationSetter';
import animation from '../../../animations/shared/hms-loading.json';
import LoadingAnimation from '../../../animations/auth/completeAuth/loading.json';
import ErrorAnimation from '../../../animations/auth/completeAuth/error.json';
import SuccessFulAnimation from '../../../animations/auth/completeAuth/successful.json';

// components
import Iconify from '../../../components/Iconify';
import Snack from '../../../components/Snack';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------
const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character or @'
    ),
});

export default function LoginForm() {
  const [LoginUser, LoginUserResponse] = BaseApi.useLoginUserMutation();
  const Navigate = useNavigate();
  const theme = useTheme();
  const { translate } = useLocales();
  const [showPassword, setShowPassword] = useState(false);

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

  // Collect Data from the Inputs
  const initialValues = {
    username: 'wahab.cs238@gmail.com',
    password: 'Helmand1200@',
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
    validationSchema: loginSchema,
    onSubmit: async () => {
      const query = {
        path: '/api/login/',
        data: values,
      };
      const res = await LoginUser(query);
      if (res.error) {
        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          animation: <Lottie options={animationSetter(ErrorAnimation)} width="12em" height="4em" />,
          message: 'Wrong Credientials',
          animationPosition: { marginLeft: '-4em' },
        });
      } else if (res.data) {
        localStorage.setItem('Token', res.data.token);
        localStorage.setItem('userEmail', res.data.user.email);
        localStorage.setItem('userName', res.data.user.username);
        localStorage.setItem('userId', res.data.user.id);
        setSnackOptions({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          animation: <Lottie options={animationSetter(SuccessFulAnimation)} width="12em" height="4em" />,
          message: 'Logged In Successfull !',
          animationPosition: { marginLeft: '-4em' },
        });
        setTimeout(() => {
          Navigate('/');
        }, 2000);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
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
      <Stack spacing={3}>
        <TextField
          value={values.username}
          name="username"
          onBlur={handleBlur}
          onChange={handleChange}
          label={translate('Email OR UserName')}
          placeholder={'Email Or Username'}
          error={formError.username && touched.username}
          helperText={formError.username}
        />

        <TextField
          value={values.password}
          name="password"
          label={translate('Password')}
          placeholder={'exmple123'}
          onBlur={handleBlur}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          error={formError.password && touched.password}
          helperText={formError.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link component={RouterLink} variant="subtitle2" to={'/user/complete-forgotpassword'}>
          {translate('Forgot password?')}
        </Link>
      </Stack>

      <Button type="submit" fullWidth size="large" variant="contained" loading={'LOADING'}>
        {LoginUserResponse.isLoading ? (
          <Lottie options={animationSetter(LoadingAnimation)} width={'150px'} height={'150px'} />
        ) : (
          translate('Login')
        )}
      </Button>
    </form>
  );
}
