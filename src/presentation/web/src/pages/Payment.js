// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';

// Lottie
import Lottie from 'react-lottie';
import paymentAnimation from '../animations/profile/update/cosmos-planets.json';
import animationSetter from '../animations/animationSetter';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { PaymentSummary, PaymentMethods, PaymentBillingAddress } from '../sections/payment';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const AnimationBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '33%',
  left: '20%',
  zIndex: -1,
  transform: `translate(-${50}%,-${50}%)`,
}));

// ----------------------------------------------------------------------

export default function Payment() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <Page title="Payment">
      <RootStyle>
        <Container>
          <Box sx={{ mt: -13 }}>
            <AnimationBox>
              <Lottie
                options={animationSetter(paymentAnimation)}
                height={'400px'}
                width={'100%'}
                isClickToPauseDisabled
              />
            </AnimationBox>
            <Typography variant="h3" align="center" paragraph>
              Let's finish powering you up!
            </Typography>
            <Typography align="center" sx={{ color: 'text.secondary' }}>
              Reach To Buy The Thing You Want.
            </Typography>
          </Box>

          <Grid container spacing={isDesktop ? 3 : 5}>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  display: 'grid',
                  gap: 5,
                  p: { md: 5 },
                  borderRadius: 2,
                  border: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
                }}
              >
                <PaymentBillingAddress />
                <PaymentMethods />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <PaymentSummary />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
