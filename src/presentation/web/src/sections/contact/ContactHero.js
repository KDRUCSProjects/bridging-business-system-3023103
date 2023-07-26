import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid } from '@mui/material';
import Lottie from 'react-lottie';
//
import { TextAnimate, MotionContainer, varFade } from '../../components/animate';

import contactUsAnimation from '../../animations/contact/contactUs2.json';
// hooks
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Afghanistan',
    address: 'Kabul/chahar-rahi-qambar  and kandahar/aino-maina',
    phoneNumber: '+93728151500',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  marginTop: '10em',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function ContactHero() {
  const { translate } = useLocales();
  // lottie configration
  const contactUsAnimationConfig = {
    loop: true,
    autoplay: true,
    animationData: contactUsAnimation,
  };
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <Grid item lg={6}>
            <Typography variant="h2" sx={{ color: 'primary.main' }} variants={varFade().inRight}>
              {translate('Where')}
            </Typography>
            <br />
            <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
              <Typography variant="h2" sx={{ mr: 2 }}>
                {translate('to')}
              </Typography>
              <Typography variant="h2" sx={{ mr: 2 }}>
                {' '}
                {translate('find')}
              </Typography>
              <Typography variant="h2" sx={{ marginBottom: '2em' }}>
                {translate('us?')}
              </Typography>
            </Box>

            {CONTACTS.map((contact) => (
              <Grid key={contact.country} item xs={12} sm={6} md={3} lg={2} sx={{ pr: { md: 5 } }}>
                <m.div variants={varFade().in}>
                  <Typography variant="h4" paragraph>
                    {translate('country')}
                  </Typography>
                </m.div>
                <m.div variants={varFade().inRight}>
                  <Typography variant="h6">
                    {translate('address')}
                    <br /> {translate('phoneNumber')}
                  </Typography>
                </m.div>
              </Grid>
            ))}
          </Grid>

          <Grid item lg={6} container spacing={5} sx={{ mt: 5, color: 'common.white' }}>
            <Lottie options={contactUsAnimationConfig} width={'600px'} isClickToPauseDisabled />
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
