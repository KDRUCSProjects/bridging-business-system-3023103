import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import useLocales from '../../hooks/useLocales';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.array,
};

export default function ProfileAbout({ profile, userdata , about }) {
  const { translate } = useLocales();
  const { quote, country, email, role, company, school: Business } = profile;
  console.log('profile :',profile)
  return (
    <Card>
      <CardHeader title={translate('About Me')} />
      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack direction="row">
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body2">
            {translate('Location')} &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {profile.results[0]?.address.area + profile.results[0]?.address.street + profile.results[0]?.address.district}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">{userdata.email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            {translate('Business at')}&nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {profile.results[0]?.address.province}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
