import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Checkbox } from '@mui/material';
// /lottie
import Lottie from 'react-lottie';
import useResponsive from '../../hooks/useResponsive';
import register from '../../animations/auth/login/glassAnimation.json';
import animationSetter from '../../animations/animationSetter';
import UserRegisterForm from '../../sections/auth/userRegister/RegisterForm';

// hooks
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';

// store

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

export default function Register() {
  const { translate } = useLocales();
  const smUp = useResponsive('up', 'sm');
  const smDown = useResponsive('down', 'md');

  const mdUp = useResponsive('up', 'md');
  const [checkBoxBValue, setCheckBoxValue] = useState(true);
  console.log(checkBoxBValue);

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Typography variant="body2" sx={{ mt: smDown ? 10 : 13, textAlign: smDown ? 'center' : undefined }}>
            {translate('Already have an account?')} {''}
            <Link variant="subtitle2" component={RouterLink} to={'/user/login'}>
              {translate('login')}
            </Link>
          </Typography>
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Lottie options={animationSetter(register)} direction={-1} width={'100%'} height={'100%'} />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" textAlign="center">
                  {translate('Get started absolutely free.')}
                </Typography>
              </Box>
            </Box>
            <UserRegisterForm />

            {/* <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              <Checkbox value={checkBoxBValue} onClick={(e) => setCheckBoxValue(!checkBoxBValue)} />
              {translate('By registering, I agree to Afghan Business')}&nbsp;
              <Link underline="always" color="primary" href="#">
                {translate('Terms of Service')}
              </Link>
              {''}
              {translate('and')}
              {''}
              <Link underline="always" color="primary.main" href="#">
                {translate('Privacy Policy')}
              </Link>
              .
            </Typography> */}

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                {translate('Already have an account?')}{' '}
                <Link variant="subtitle2" component={RouterLink} to={'login'}>
                  {translate('Login')}
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
