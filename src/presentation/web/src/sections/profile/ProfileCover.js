import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import animationSetter from '../../animations/animationSetter';
import CoverWaveAnimation from '../../animations/profile/116915-waves.json';
// components
import MyAvatar from '../../components/MyAvatar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  myProfile: PropTypes.object,
};

export default function ProfileCover({ myProfile , userdata }) {
  const { position, cover } = myProfile;

  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
          myphoto={myProfile[0].avator}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">{myProfile[0].business_name}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{myProfile[0].business_type}</Typography>
        </Box>
      </InfoStyle>
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Lottie options={animationSetter(CoverWaveAnimation)} width={'100%'} />
      </Box>
    </RootStyle>
  );
}
