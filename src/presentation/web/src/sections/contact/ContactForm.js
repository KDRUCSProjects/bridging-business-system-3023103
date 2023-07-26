import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import BaseApi from '../../store/BaseApi';
import { MotionViewport, varFade } from '../../components/animate';
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const ContactSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});
export default function ContactForm() {
  const [CreateContactMessages, ContactResponse] = BaseApi.useCreateContactMessageMutation();
  const Navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
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
    validationSchema: ContactSchema,
    onSubmit: async () => {
      const query = {
        path: '/api/contact_us/',
        data: values,
      };
      const res = await CreateContactMessages(query);
      if (res.error) {
        enqueueSnackbar('error', { variant: 'error' });
      } else if (res.data) {
        enqueueSnackbar('Message sended!');
        setTimeout(() => {
          Navigate('/');
        }, 2000);
      }
    },
  });
  console.log(ContactResponse);

  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          {translate('Feel free to contact us')} <br />
          {translate('We will be glad to hear from you')}, {translate('buddy')}.
        </Typography>
      </m.div>

      <Stack spacing={3}>
        <m.div variants={varFade().inUp}>
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            value={values.name}
            error={formError.name && 'error.main'}
            helperText={formError.name ? formError.name : undefined}
            fullWidth
            label={translate('name')}
          />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            value={values.email}
            error={formError.email && 'primary.main'}
            helperText={formError.email ? formError.email : undefined}
            fullWidth
            label={translate('Email')}
            rows={4}
          />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            name="subject"
            value={values.subject}
            error={formError.subject && 'error.main'}
            helperText={formError.subject ? formError.subject : undefined}
            fullWidth
            label={translate('subject')}
          />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            name="message"
            value={values.message}
            error={formError.message && 'error.main'}
            helperText={formError.message ? formError.message : undefined}
            fullWidth
            multiline
            rows={5}
            label={translate('message')}
          />
        </m.div>
      </Stack>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained" type="submit" onClick={handleSubmit}>
          {translate('submit')}
        </Button>
      </m.div>
    </Stack>
  );
}
