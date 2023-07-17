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
import BaseApi from '../../store/BaseApi';

const productsList = [
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
  const { isSuccess,data , isError ,isLoading} = BaseApi.useGetSpecificProductQuery(`api/product/?page=${currentPage}`);
    const divStyle = { position: 'relative', left: '45%' , top:"7px" };
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };
    if(isError){
     <h1>Error</h1>
    }
    else if(isLoading){
      <h1>loading...</h1>
    }
//  console.log(data.results)


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
          {isSuccess ?  data.results?.map((product) => (

            <Card
              component={Link}
              key={product.id}
              to={`/product/details`} //   /${product.id}
              style={{ textDecoration: 'none' }}
            >
              <ShopProductCard key={product.id} product={product} />
            </Card>
          )): 'NO data'}
        </Box>
        {/* pagination in frontend */}
        <div spacing={2} sx={{ marginTop : 5 }} style={divStyle} >
          <Pagination count={data.total_pages} color='primary' onChange={handlePageChange}/>
        </div>
      </Container>
    </Page>
    
  );
}
