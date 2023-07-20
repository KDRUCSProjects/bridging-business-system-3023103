import { Link as RouterLink } from 'react-router-dom';
import { m } from 'framer-motion'
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Container, Typography } from '@mui/material';

// /lottie
import Lottie from 'react-lottie';
// animation
import birdFlying from '../../animations/auth/login/bird-flying.json';
import airplane from '../../animations/auth/login/airplane.json';

//
import animationSetter from '../../animations/animationSetter';


// hooks
import useResponsive from '../../hooks/useResponsive';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';
import { MotionContainer, varBounce } from '../../components/animate';
// sections
import LoginForm from '../../sections/auth/login/LoginForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const {translate}= useLocales();
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              {translate('Don’t have an account?')}
              <Link variant="subtitle2" component={RouterLink} to={'/user/register'}>
                {translate('Get started')}
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (

            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                <Lottie options={animationSetter(birdFlying)} />
              </Typography>
            </SectionStyle>
        )}

        <Container maxWidth="sm" component={MotionContainer}>
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {translate('Sign in To')}{' '}
                  <Typography variant="h4" sx={{ color: 'primary.main' }}>
                    {translate('Afghan')}
                  </Typography>{' '}
                  {translate('Business')}
                </Typography>

                <Box position={'absolute'} top="20px">
                  <Lottie height={'200px'} width={'100%'} options={animationSetter(airplane)} />
                </Box>

              </Box>
            </Stack>
            <m.div variants={varBounce().inLeft}>
              <LoginForm />
            </m.div>

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                {translate('Don’t have an account?')}{' '}
                <Link variant="subtitle2" component={RouterLink} to={'register'}>
                  {translate('Get started')}
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
