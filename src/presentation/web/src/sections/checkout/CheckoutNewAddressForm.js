import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Typography, Button, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// _mock
import { countries } from '../../@fake-db';
import { FormProvider, RHFCheckbox, RHFSelect, RHFTextField } from '../../components/hook-form';
import { onNextStep, onBackStep } from '../../store/slices/checkout/checkout';
import { useDispatch } from '../../store/store';
// ----------------------------------------------------------------------

CheckoutNewAddressForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function CheckoutNewAddressForm() {
  const dispatch = useDispatch();
  const NewAddressSchema = Yup.object().shape({
    receiver: Yup.string().required('Fullname is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
  });

  const defaultValues = {
    addressType: 'Home',
    receiver: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: countries[0].label,
    zipcode: '',
    isDefault: true,
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = () => {
    dispatch(onNextStep());
  };
  const onPreStep = () => {
    dispatch(onBackStep());
  };
  return (
    <>
      <Typography gutterBottom variant="h4" textTransform={'capitalize'}>
        Add new address
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <RHFTextField name="receiver" label="Full Name" />
            <RHFTextField name="phone" label="Phone Number" />
          </Box>

          <RHFTextField name="address" label="Address" />

          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
            }}
          >
            <RHFTextField name="city" label="Town / City" />
            <RHFTextField name="state" label="State" />
            <RHFTextField name="zipcode" label="Zip / Postal Code" />
          </Box>

          <RHFSelect name="country" label="Country">
            {countries.map((option) => (
              <option key={option.code} value={option.label}>
                {option.label}
              </option>
            ))}
          </RHFSelect>
        </Stack>

        <Divider sx={{ my: '1em' }} />

        <LoadingButton sx={{ mr: '1em' }} type="submit" variant="contained" loading={isSubmitting}>
          Deliver to this Address
        </LoadingButton>
        <Button color="inherit" variant="outlined" onClick={onPreStep}>
          Cancel
        </Button>
      </FormProvider>
    </>
  );
}
