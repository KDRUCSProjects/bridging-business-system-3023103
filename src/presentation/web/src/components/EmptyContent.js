import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// lottie
import Lottie from 'react-lottie';
import animationSetter from '../animations/animationSetter';
import animation from '../animations/shop/cart (2).json';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

EmptyContent.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  description: PropTypes.string,
};

export default function EmptyContent({ title, description, img, ...other }) {
  return (
    <RootStyle {...other}>
      <Lottie options={animationSetter(animation)} width={'40%'} height={'40%'} />
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}
