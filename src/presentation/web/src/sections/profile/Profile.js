import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfileBio from './ProfileBio';
// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};
const aboutme = "About Me";
const bio = "Bio";
export default function Profile({ myProfile, userdata, posts }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileAbout profile={myProfile} userdata={userdata} about={aboutme}/>
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfileBio profile={myProfile} about={bio}/>
        </Stack>
      </Grid>
    </Grid>
  );
}
