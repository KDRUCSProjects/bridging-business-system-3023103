import { Link } from 'react-router-dom';
import { Grid, Card, Typography, Container, Box, Button } from '@mui/material';
import Lottie from 'react-lottie';
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import animationSetter from '../../animations/animationSetter';
import Welcome from '../../animations/welcome0.json';

export default function WelcomePage() {
  return (
    <Page title="Welcome page">
      <Container sx={{ textAlign: 'center', alignItem: 'center' }}>
        <Logo />
        <Box mt={1}>
          <Lottie options={animationSetter(Welcome)} width={'60%'} height={'23%'} />
        </Box>

        <Box>
          <Typography variant="h3">Welcome to Afghan Tejarat(AT) Website</Typography>
          <Typography>
            A website for connecting Businesses around the country, help you to find products in an effecint way.
          </Typography>
          <Typography>And we provide an easy way to share your products for salling.</Typography>
        </Box>
        <Button component={Link} to={'/'} variant="contained" sx={{ mt: '1rem' }}>
          Lets Start
        </Button>
      </Container>
    </Page>
  );
}
