// @mui
import { styled } from '@mui/material/styles';
import { Switch, Divider, Typography, Stack, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Lottie
import Lottie from 'react-lottie';

// store
import { useDispatch } from 'react-redux';
import { onNextStep } from '../../store/slices/checkout/checkout';

// animations
import paymentAnimation from '../../animations/payment/payment.json';
import animationSetter from '../../animations/animationSetter';

// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

// ----------------------------------------------------------------------

export default function PaymentSummary() {
  const dispatch = useDispatch();
  const onNextToComplete = () => {
    console.log('Clicked');
    dispatch(onNextStep());
  };

  return (
    <RootStyle>
      <Grid container flexDirection="row" justifyContent="center" alignItems="flex-start">
        <Grid item md={6}>
          <Typography variant="subtitle1" sx={{ mb: 5, width: '30%' }}>
            Summary
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Lottie options={animationSetter(paymentAnimation)} />
        </Grid>
      </Grid>
      <Stack spacing={2.5}>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Total Billed
          </Typography>
          <Typography variant="h6" component="p">
            $9.99*
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>
      <LoadingButton fullWidth size="large" onClick={onNextToComplete} variant="contained" sx={{ mt: 5, mb: 3 }}>
        Pay Me
      </LoadingButton>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </RootStyle>
  );
}
