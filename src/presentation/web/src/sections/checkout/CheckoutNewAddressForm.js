import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
// animation
import Lottie from 'react-lottie';

// @mui
import { Box, Stack, Typography, Button, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// _mock
import { FormProvider, RHFCheckbox, RHFSelect, RHFTextField } from '../../components/hook-form';
import Snack from '../../components/Snack';
import animationSetter from '../../animations/animationSetter';
import LoadingAnimation from '../../animations/auth/completeAuth/loading.json';
import SuccessAnimation from '../../animations/auth/completeAuth/successful.json';
import ErrorAnimation from '../../animations/auth/completeAuth/error.json';
import { onNextStep, onBackStep } from '../../store/slices/checkout/checkout';
import BaseApi from '../../store/BaseApi';
import useResponsive from '../../hooks/useResponsive';
import { useSelector, useDispatch } from '../../store/store';
// ----------------------------------------------------------------------

CheckoutNewAddressForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

const userId = 8;

export default function CheckoutNewAddressForm() {
  const productList = useSelector((store) => store.checkout.checkout.cart);
  const { checkout } = useSelector((store) => store.checkout);

  const { total } = checkout;
  console.log('total in order', total);

  const [createOrder, { isLoading }] = BaseApi.useCreateOrderMutation('');
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLgDown = useResponsive('down', 'lg');

  const NewAddressSchema = Yup.object().shape({
    province: Yup.string().required('Province is required'),
    district: Yup.string().required('District is required'),
    area: Yup.string().required('Area is required'),
    street: Yup.string().required('Street is required'),
  });

  const [snackOptions, setSnackOptions] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    backgroundColor: undefined,
    color: undefined,
    animation: undefined,
    message: undefined,
    animationPosition: undefined,
  });
  const handleSnackClose = () => {
    setSnackOptions({ ...snackOptions, open: false });
  };

  const defaultValues = {
    province: '',
    district: '',
    area: '',
    street: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });
  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    const productDetails = [];
    productList.map((product) => {
      const obj = {
        product: product.id,
        quantity: product.quantity,
        price: product.price,
      };
      return productDetails.push({
        product: product.id,
        quantity: product.quantity,
        price: product.price,
      });
    });

    const data = new FormData();
    const address = {
      area: values.area,
      district: values.district,
      province: values.province,
      street: values.street,
    };
    Object.entries(address).forEach(([key, value]) => {
      data.append(`address.${key}`, value);
    });
    data.append('total', total);
    data.append('uploaded_order_products', JSON.stringify(productDetails));
    data.append('user', userId);
    const query = {
      path: '/api/order/',
      data,
    };

    const res = await createOrder(query);
    console.log('res of', res);
    if (res.error) {
      setSnackOptions({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        animation: isLgDown ? undefined : (
          <Lottie options={animationSetter(ErrorAnimation)} width="12em" height="4em" />
        ),
        message: res.error.data?.user ? res.error.data?.user : 'Something went wrong !',
        animationPosition: isLgDown ? undefined : { marginLeft: '-4em' },
      });
    } else if (res.data) {
      setSnackOptions({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        animation: isLgDown ? undefined : (
          <Lottie options={animationSetter(SuccessAnimation)} width="12em" height="4em" />
        ),
        message: 'Welcome !',
        animationPosition: isLgDown ? undefined : { marginLeft: '-4em' },
      });
    }

    // dispatch(onNextStep());
  };
  const onPreStep = () => {
    dispatch(onBackStep());
  };
  const values = watch();

  return (
    <>
      <Typography gutterBottom variant="h4" textTransform={'capitalize'}>
        Add new address
      </Typography>

      <Snack
        vertical={snackOptions.vertical}
        horizontal={snackOptions.horizontal}
        open={snackOptions.open}
        onClose={handleSnackClose}
        message={snackOptions.message}
        animation={snackOptions.animation}
        autoHideDuration={5000}
        backgroundColor={snackOptions.backgroundColor}
        color={snackOptions.color}
        animationPosition={snackOptions.animationPosition}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="province" label="Province" />

          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
            }}
          >
            <RHFTextField name="district" label="District" />
            <RHFTextField name="area" label="Area" />
            <RHFTextField name="street" label="Street" />
          </Box>
        </Stack>

        <Divider sx={{ my: '1em' }} />

        <LoadingButton sx={{ mr: '1em' }} type="submit" variant="contained" loading={isLoading}>
          Deliver to this Address
        </LoadingButton>
        <Button color="inherit" variant="outlined" onClick={onPreStep}>
          Cancel
        </Button>
      </FormProvider>
    </>
  );
}
