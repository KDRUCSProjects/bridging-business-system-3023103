import PropTypes from 'prop-types';
// @mui
import { Link } from 'react-router-dom';
import { Box, Container, Button } from '@mui/material';
// components
import { SkeletonProductItem } from '../../components/skeleton';

//
import ShopProductCard from './ShopProductCard';
import Page from '../../components/Page';

const products = [
  {
    id: 1,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
  {
    id: 2,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
  {
    id: 3,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
  {
    id: 4,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
  {
    id: 5,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
  {
    id: 6,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
  {
    id: 7,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
];
export default function ShopProductList() {
  return (
    <Page title="Ecommerce: Shop">
      <Container>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          }}
        >
          {products.map((product, index) => (
            <Button
              component={Link}
              key={product + index}
              to={`/product/details`} //   /${product.id}
              style={{ textDecoration: 'none' }}
            >
              <ShopProductCard key={product.id} product={product} />
            </Button>
          ))}
        </Box>
      </Container>
    </Page>
  );
}
