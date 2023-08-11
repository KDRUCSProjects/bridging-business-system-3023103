// @mui
import { Container, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
// hooks
import BaseApi from '../../../store/BaseApi';
import useSettings from '../../../hooks/useSettings';

// components
import Page from '../../../components/Page';
// sections
import ProfileForm from '../../../sections/profile/create/ProfileForm';

// ----------------------------------------------------------------------

export default function CreateProfile() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const {
    data: userProfile,
    isError,
    isSuccess,
    isLoading,
  } = BaseApi.useGetSpecificProfileQuery(`api/business_profile/${id}/`);

  const isEdit = true;
  console.log('data: ', userProfile);

  return (
    <Page title="CreateBusinessProfile ">
      <Box sx={{ mt: '7em' }}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          {id && isSuccess ? <ProfileForm isEdit={isEdit} userProfile={userProfile} /> : <ProfileForm />}
        </Container>
      </Box>
    </Page>
  );
}
