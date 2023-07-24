import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import { useNavigate,Link  } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box,Stack, Button, Rating, Divider, IconButton, Typography } from '@mui/material';

// utils
import { fShortenNumber, fCurrency } from '../../utils/formatNumber';
// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import { ColorSinglePicker } from '../../components/color-utils';
import RHFSelect from '../../components/hook-form/RHFSelect';
import FormProvider from '../../components/hook-form/FormProvider';
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.shape({
    available: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    cover: PropTypes.string,
    id: PropTypes.string,
    inventoryType: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    // sizes: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    totalRating: PropTypes.number,
    // totalReview: PropTypes.number,
  }),
};

export default function ProductDetailsSummary({ cart, product, onAddCart, onGotoStep, ...other }) {
  const { translate} =useLocales();
  const theme = useTheme();

  const navigate = useNavigate();

  const { id,color, name , quantity , price ,productRatting , user, ratting } = product;
  const alreadyProduct = cart.map((item) => item.id).includes(id);
  const sizes = [
    43, 44 , 45 , 56 , 47
  ]
  const defaultValues = {
    id,
    name,
    price,
    color: color[0],
    size: sizes[4],
  };
  const userId = localStorage.getItem('userId')
  const uId = 2 ;
  const methods = useForm({
    defaultValues,
  });
  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      if (!alreadyProduct) {
        onAddCart({
          ...data,
          subtotal: data.price * data.quantity,
        });
      }
      onGotoStep(0);
    } catch (error) {
      console.error(error);
    }
  };
 let linkto = '';
 if(user !== uId ){
  linkto = `/profile/${user}/`
 }else{
  linkto = `/userprofile/${user}/`
 }

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        subtotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" paragraph>
          {name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Rating value={ratting} precision={0.1} readOnly />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(productRatting.length)}
            {translate('reviews')} )
          </Typography>
        </Stack>

        <Typography variant="h4" sx={{ mb: 3 }}>
          &nbsp;{fCurrency(price)}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
           {translate('color')}
          
          </Typography>

          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorSinglePicker
                colors={color}
                value={field.value}
                onChange={field.onChange}
                sx={{
                  ...(color.length > 4 && {
                    maxWidth: 144,
                    justifyContent: 'flex-end',
                  }),
                }}
              />
            )}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
           {translate('size')} 
          </Typography>

          <RHFSelect
            name="size"
            size="small"
            fullWidth={false}
            FormHelperTextProps={{
              sx: { textAlign: 'right', margin: 0, mt: 1 },
            }}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </RHFSelect>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            {translate('quantity')}
          </Typography>

          <div>
            <Typography>{product.quantity}</Typography>
            <Typography variant="caption" component="div" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
              {translate('available')} 
            </Typography>
          </div>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </FormProvider>
      <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
  
         {translate('add to cart')} 
          </Button>    
          <Button  component={Link} to={linkto}  fullWidth size="large"  startIcon={<Person2Icon />} variant="contained">
           {translate('view profile')} 
          </Button>
        </Stack>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
