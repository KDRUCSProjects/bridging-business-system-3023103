import React from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, Snackbar } from '@mui/material';


export default function Snack({vertical ,horizontal,open,onClose , message, animation, autoHideDuration, width, height, backgroundColor , color  , animationPosition}) {
  const theme = useTheme();
  return (
    <>

      <Snackbar
      onClose={onClose}
        anchorOrigin={{vertical,horizontal} }
        open={open} 
        autoHideDuration={autoHideDuration}
        sx={{
          zIndex: theme.zIndex.appBar + 1,
          backgroundColor,
          color,
          width, 
          height,
          borderRadius: '10px',
          overflow:"hidden",
          px:'1rem'
        }}

      >
        <Grid container flexDirection='row' alignItems={'center'} justifyContent={'flex-start'}>
          <Grid item sx={{...animationPosition}}>
            {animation}
          </Grid>
          <Grid item>
            {message}
          </Grid>
        </Grid>

      </Snackbar>
    </>
  );
}
