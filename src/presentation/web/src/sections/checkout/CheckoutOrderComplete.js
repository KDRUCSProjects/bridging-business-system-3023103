import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Divider, Typography, Stack } from '@mui/material';
import Lottie from 'react-lottie';

// redux
import { useDispatch } from '../../store/store';
import { onGotoStep } from '../../store/slices/checkout/checkout';

// components
import Iconify from '../../components/Iconify';
import { DialogAnimate } from '../../components/animate';
import animationSetter from '../../animations/animationSetter';
import ThanYouAnimation from '../../animations/payment/voyage.json';
import useResponsive from '../../hooks/useResponsive';
// assets

// ----------------------------------------------------------------------

const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - 48px)',
      maxHeight: 'calc(100% - 48px)',
    },
  },
}));

// ----------------------------------------------------------------------

export default function CheckoutOrderComplete() {
  const navigate = useNavigate();
  const isSmall = useResponsive('down', 'sm');

  const dispatch = useDispatch();

  const handleResetStep = () => {
    dispatch(onGotoStep(0));
    navigate('/user/checkout');
  };
  const handleToNextBuy = () => {
    navigate('/');
  };

  return (
    <DialogStyle fullScreen open>
      <Lottie
        options={animationSetter(ThanYouAnimation)}
        width={isSmall ? '100%' : '400px'}
        height={isSmall ? '100%' : '400px'}
      />
      <Box sx={{ p: 4, maxWidth: 580, margin: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Thank you for your purchase!
          </Typography>
          Our app is complete purchase system In Afghanistan
          <Typography align="left" sx={{ color: 'text.secondary' }}>
            Your Trust , Make as More Motivate To Made This More Good
            <br /> <br /> If you have any question or queries then fell to get in contact us. <br /> <br /> All the
            best,
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent="space-between" spacing={2}>
          <Button color="inherit" onClick={handleResetStep} startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon={'ant-design:file-pdf-filled'} />}
            onClick={handleToNextBuy}
          >
            Let's Buy More
          </Button>
        </Stack>
      </Box>
    </DialogStyle>
  );
}
