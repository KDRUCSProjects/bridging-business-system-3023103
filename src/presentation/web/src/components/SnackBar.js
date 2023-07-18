import React from 'react';

import Lottie from 'react-lottie';

import { Box, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { Shop } from '@mui/icons-material';
import animationSetter from '../animations/animationSetter';

export default function Snack({ message, animation }) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>Top-Center</Button>
      </Box>

      <Box>
        <Lottie options={animationSetter(animation)} />
        <Snackbar
          ContentProps={<Shop />}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={message}
          key={vertical + horizontal}
        />
      </Box>
    </>
  );
}
