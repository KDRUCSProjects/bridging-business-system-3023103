import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// @mui
import { Button, Link, Stack, IconButton, InputAdornment, Alert, TextField } from '@mui/material';
// import { LoadingButton } from '@mui/lab';

// Formik & yup
import * as yup from 'yup';
import { useFormik } from 'formik';

// components
import Iconify from '../../../components/Iconify';

import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------
const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character or @'
    ),
});

export default function LoginForm() {
  const Navigate = useNavigate();
  const {translate}= useLocales();
  const [showPassword, setShowPassword] = useState(false);
  // validation

  // Collect Data from the Inputs
  const initialValues = {
    email: '',
    password: '',
  };

  const {
    values,
    errors: formError,
    handleBlur,
    touched,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
  });

  const FormiFunction = async (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={FormiFunction}>
      <Stack spacing={3}>
        <TextField
          value={values.email}
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          label={translate("Email")}
          placeholder={'exmple@gamil.com'}
          error={formError.email && touched.email}
          helperText={formError.email}
        />

        <TextField
          value={values.password}
          name="password"
          label={translate("Password")}
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
        <Link component={RouterLink} variant="subtitle2" to={'reset-password'}>
          {translate('Forgot password?')}
        </Link>
      </Stack>

      <Button type="submit" fullWidth size="large" variant="contained" loading={'LOADING'}>
        {translate('Login')}
      </Button>
    </form>
  );
}
