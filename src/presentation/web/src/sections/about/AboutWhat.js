import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography, LinearProgress } from '@mui/material';
// lottie
import Lottie  from 'react-lottie';
// animtion
import growth from '../../animations/about/company.json'
// hooks

import useResponsive from '../../hooks/useResponsive';
// utils
import { fPercent } from '../../utils/formatNumber';

import {_skills} from '../../@fake-db'
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------


export default function AboutWhat() {
  const theme = useTheme();

   // lottie configration
   const growthAnimationConfig = {
    loop: true,
    autoplay: true,
    animationData: growth,
  };

  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');

  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.48)}`;

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={3} flexDirection={isMobile ?'column-reverse':"undefiend"}>
          
            <Grid item  xs={12} md={6} lg={7} sx={{ pr: { md: 7 } }}>
                  <m.div variants={varFade().inUp}>
                  <Lottie options={growthAnimationConfig}  width={isMobile ? '200px':'400px'}  height={isMobile ? '200px':'400px'}/>
                  </m.div>
            </Grid>
       

          <Grid item xs={12} md={6} lg={5}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                What is Ecommerce?
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
                }}
              >
            Electronic commerce (ecommerce) refers to companies and individuals that buy and sell goods and services over the Internet. Ecommerce operates in different types of market segments and can be conducted over computers, tablets, smartphones, and other smart devices. Nearly every imaginable product and service
              </Typography>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
};

function ProgressItem({ progress }) {
  const { label, value } = progress;

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2">{label}&nbsp;-&nbsp;</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fPercent(value)}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          '& .MuiLinearProgress-bar': { bgcolor: 'grey.700' },
          '&.MuiLinearProgress-determinate': { bgcolor: 'divider' },
        }}
      />
    </Box>
  );
}
