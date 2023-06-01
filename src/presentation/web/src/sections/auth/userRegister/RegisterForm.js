import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// import { yepResolver } from '@hookform/resolvers/yep';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Formik & yep
import * as yup from 'yup';
import { useFormik } from 'formik';

// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------
const RegisterSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  number: yup.number().required(),
  password: yup
  .string()
  .required('Please enter your password')
  .matches(
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  'Password must contain at least 8 characters, one uppercase, one number and one special case character or @'
  ),
  });

export default function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false);


  const initialValues = {
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    password: '',
  };

  const {
    values,
    errors: formError,
    handleBlur,
    handleSubmit,
    touched,
    handleChange,
    } = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    });
  
  return (
    <FormProvider onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField 
          value={values.firstName}
          name="firstName" 
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder='First Name'
          error={formError.firstName && touched.firstName}
          helperText={formError.firstName}
          label="First name" />
          <TextField 
          value={values.lastName}
          name="lastName" 
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder='last Name'
          error={formError.lastName && touched.lastName}
          helperText={formError.lastName}
          label="Last name" />
        </Stack>

        <TextField 
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='Email Address'
        error={formError.email && touched.email}
        helperText={formError.email}
        name="email"
        label="Email address" />

        <TextField 
        value={values.number}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='Phone Number'
        error={formError.number && touched.number}
        helperText={formError.number}
        name="number" 
        label="Phone number" />

        <TextField
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder='password'
          error={formError.password && touched.password}
          helperText={formError.password}
          name="password"
          label="Password"
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

        <LoadingButton fullWidth size="large" type="submit" variant="contained" >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
