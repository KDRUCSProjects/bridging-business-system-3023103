import PropTypes, { object } from 'prop-types';
import { useEffect } from 'react';
import _ from 'lodash';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector } from '@mui/material';

// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';

// redux
import { useDispatch, useSelector } from '../../store/store';
import { getCart, createBilling } from '../../store/slices/checkout/checkout';

// sections
import Payment from '../Payment';

import { CheckoutOrderComplete, CheckoutNewAddressForm, CheckoutCart } from '../../sections/checkout';

// components

import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const STEPS = ['Cart', 'Address', 'Payment'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Iconify icon={'eva:checkmark-fill'} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}

export default function Checkout() {
  const isDesktop = useResponsive('up', 'md');
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { checkout } = useSelector((store) => store.checkout);
  const { cart, billing, activeStep } = checkout;
  const isComplete = 3;

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  return (
    <Page title="Afghan Business: Checkout">
      <Box ml={isDesktop ? 14 : undefined} mb={isDesktop ? undefined : 4}>
        <Logo />
      </Box>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mt: -5, mb: 5 }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled',
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
        {activeStep === 0 && <CheckoutCart />}
        {activeStep === 1 && <CheckoutNewAddressForm />}
        {activeStep === 2 && <Payment />}
        {activeStep === 3 && <CheckoutOrderComplete />}
      </Container>
    </Page>
  );
}
