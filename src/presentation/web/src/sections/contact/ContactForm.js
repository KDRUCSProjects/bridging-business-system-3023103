import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

export default function ContactForm() {
  const {translate} = useLocales();
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
          <TextField fullWidth label={translate('name')} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label={translate('email')} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label={translate('subject')} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label={translate('enter your message here')} multiline rows={4} />
        </m.div>
      </Stack>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          {translate('submit')}
        </Button>
      </m.div>
    </Stack>
  );
}
