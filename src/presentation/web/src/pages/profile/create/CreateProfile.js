import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container, Box } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../@fake-db';
// components
import Page from '../../../components/Page';
// sections
import ProfileForm from '../../../sections/profile/create/ProfileForm';
// ----------------------------------------------------------------------

export default function CreateProfile() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  return (
    <Page title="User: Create a new user">
      <Box sx={{ mt: '7em' }}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <ProfileForm />
        </Container>
      </Box>
    </Page>
  );
}
