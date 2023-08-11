import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
// @mui
import ChatIcon from '@mui/icons-material/Chat';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Stack } from '@mui/material';
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

export default function ProfileCover({ myProfile, condition }) {
  return (
    <RootStyle>
      <InfoStyle>
        <Stack direction="row" justifyContent="space-between">
          <MyAvatar
            sx={{
              mx: 'auto',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'common.white',
              width: { xs: 80, md: 128 },
              height: { xs: 80, md: 128 },
            }}
            myphoto={myProfile.results[0]?.avator}
          />

          <Box
            sx={{
              ml: { md: 3 },
              mt: { xs: 2, md: 1 },
              color: 'common.white',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h4">{myProfile.results[0]?.businessName}</Typography>
            <Typography sx={{ opacity: 0.72 }}>{myProfile.results[0]?.business_type}</Typography>
          </Box>
          {condition === 1 ? (
            <Button
              endIcon={<ChatIcon />}
              variant="contained"
              sx={{ position: 'absolute', left: '9rem', bottom: '1.1em', width: '200' }}
              component={Link}
              to={'/'}
              target="_blank"
            >
              Chat
            </Button>
          ) : null}
        </Stack>
      </InfoStyle>
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Lottie options={animationSetter(CoverWaveAnimation)} width={'100%'} />
      </Box>
    </RootStyle>
  );
}
