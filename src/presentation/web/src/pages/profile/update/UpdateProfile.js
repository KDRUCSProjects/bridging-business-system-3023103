// @mui
import { Container, Box } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';

// components
import Page from '../../../components/Page';
// sections
import ProfileForm from '../../../sections/profile/update/ProfileForm';
// ----------------------------------------------------------------------

export default function UpdateProfile() {
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
