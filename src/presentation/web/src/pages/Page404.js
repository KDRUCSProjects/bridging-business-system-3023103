import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
// Animation
import Lottie from 'react-lottie';
import AnimationSetter from '../animations/animationSetter';
import animation from '../animations/notFound/notFound.json';
import airplane from '../animations/notFound/flying-bird.json';
// components
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';

// ----------------------------------------------------------------------

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
const AnimationBox = styled('Box')(({ theme }) => ({
  position: 'absolute',
  top: '53%',
  left: '53%',
  zIndex: -1,
  transform: `translate(-${50}%,-${50}%)`,
}));

export default function Page404() {
  return (
    <Page title="404 Page Not Found">
      <Container component={MotionContainer}>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              Sorry, page not found!
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Lottie options={AnimationSetter(animation)} sx={{ height: 460, my: { xs: 5, sm: 10 } }} />
            <AnimationBox>
              <Lottie options={AnimationSetter(airplane)} height={'200%'} width={'100%'} />
            </AnimationBox>
          </m.div>

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
