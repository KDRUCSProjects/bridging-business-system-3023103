// @mui
import { Container, Box, Typography } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';

// components
import Page from '../../../components/Page';
// sections
import ProfileForm from '../../../sections/profile/create/ProfileForm';
// ----------------------------------------------------------------------

export default function CreateProfile() {
  const { themeStretch } = useSettings();

  return (
    <Page title="CreateBusinessProfile ">
      <Box sx={{ mt: '7em' }}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <ProfileForm />
        </Container>
      </Box>
    </Page>
  );
}
