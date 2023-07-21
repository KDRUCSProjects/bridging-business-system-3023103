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
  return (
    <Card>
      <CardHeader title={translate('Bio')} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{profile[0].detials}</Typography>
      </Stack>
    </Card>
  );
}
