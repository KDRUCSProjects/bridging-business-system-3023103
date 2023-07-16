import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Link } from 'react-router-dom';
import { Box, Container, Button , Card} from '@mui/material';
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
  {
    id: 8,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
  {
    id: 9,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
  {
    id: 10,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
  {
    id: 11,
    name: 'product1',
    cover: 'yellow',
    price: '200$',
    colors: ['white', 'green', 'red', 'yellow'],
    status: 'sold',
    priceSale: '400$',
  },
];
export default function ShopProductList() {
  const [currentPage, setCurrentPage] = useState(1);
    const divStyle = { position: 'relative', left: '45%' , top:"7px" };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    // const adPageQuery = useQuery(['pages', currentPage], () => getObjectsByPageNumber(currentPage));
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
            <Card
              component={Link}
              key={product + index}
              to={`/product/details`} //   /${product.id}
              style={{ textDecoration: 'none' }}
            >
              <ShopProductCard key={product.id} product={product} />
            </Card>
          ))}
        </Box>
        {/* pagination in frontend */}
        <div spacing={2} sx={{ marginTop : 5 }} style={divStyle} >
          <Pagination count={5} color='primary' onChange={handlePageChange}/>
        </div>
      </Container>
    </Page>
    
  );
}
