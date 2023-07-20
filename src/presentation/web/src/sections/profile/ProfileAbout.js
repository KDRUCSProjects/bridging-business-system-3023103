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
  profile: PropTypes.object,
};

export default function ProfileAbout({ profile }) {
  const { translate } = useLocales();
  const { quote, country, email, role, company, school: Business } = profile;
  return (
    <Card>
      <CardHeader title={translate('About me')} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{profile[0].detial}</Typography>

        <Stack direction="row">
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body2">
            {translate('Location')} &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {profile[0].address.area + profile[0].address.street + profile[0].address.district}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">{profile[0].business_owner.email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            {translate('Business at')}&nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {profile[0].address.province}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
