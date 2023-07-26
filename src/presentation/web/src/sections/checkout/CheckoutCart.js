import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../store/store';
import { deleteCart, onNextStep, handleDirectQuantity } from '../../store/slices/checkout/checkout';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import EmptyContent from '../../components/EmptyContent';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';

import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

export default function CheckoutCart(activeStep) {
  const productList = useSelector((store) => store.checkout.checkout.cart);
  const quantity = useSelector((store) => store.checkout.quantity);

  const dispatch = useDispatch();

  const { checkout } = useSelector((store) => store.checkout);

  const { cart, total, subtotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = cart.length === 0;
  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };
  const handleQuantity = (productId, DirectQuantity) => {
    dispatch(handleDirectQuantity(productId, DirectQuantity));
  };
  console.log(quantity);

  const { translate } = useLocales();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                {translate('Card')}
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} {translate('item')})
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <CheckoutProductList
                products={productList}
                quantity={quantity}
                onDelete={handleDeleteCart}
                handleQuantity={handleQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title={translate('Cart is empty')}
              description={translate('Look like you have no items in your shopping cart.')}
            />
          )}
        </Card>

        <Button
          color="inherit"
          component={RouterLink}
          to={'Home'}
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          {translate('Continue Shopping')}
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary total={total} subtotal={subtotal} />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          // disabled={cart.length === 0}
          onClick={handleNextStep}
        >
          {translate('Check Out')}
        </Button>
      </Grid>
    </Grid>
  );
}
