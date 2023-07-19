import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
import { useParams } from 'react-router';
//
import ProfileAbout from './ProfileAbout';
import ProfileSocialInfo from './ProfileSocialInfo';
import BaseApi from '../../store/BaseApi';
// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile({ myProfile, posts }) {
  const { id } = useParams();
  const {data , isError ,isSuccess , isLoading } = BaseApi.useGetSpecificUserQuery(`api/users/${id}/`);
  console.log('user data',data)
  return (
    (isSuccess?
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <ProfileAbout profile={myProfile}  profiledata={data}/>
            <ProfileSocialInfo profile={myProfile} />
          </Stack>
        </Grid>
      </Grid>:"Data Not Found"
      )
  );
}
