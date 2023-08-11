import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
// @mui
import { Link } from 'react-router-dom';
import { Box, Container, Card, Typography } from '@mui/material';
//
import ShopProductCard from './ShopProductCard';
import Page from '../../components/Page';
import BaseApi from '../../store/BaseApi';

export default function ShopProductList({ title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { isSuccess, data, isError, isLoading } = BaseApi.useGetSpecificProductQuery(
    `api/product/?page=${currentPage}`
  );
  const divStyle = { position: 'relative', left: '45%', top: '7px' };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  if (isError) {
    <h1>Error</h1>;
  } else if (isLoading) {
    <h1>loading...</h1>;
  }
  return (
    <Page title="Ecommerce: Shop">
      <Container>
        <div variants={'h5'}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'start' }}>
            {title}
          </Typography>
        </div>
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
          {isSuccess
            ? data.results?.map((product) => (
                <Link
                  key={product.id + product.name}
                  to={`product/details/${product.id}/`}
                  style={{ textDecoration: 'none' }}
                >
                  <ShopProductCard product={product} />
                </Link>
              ))
            : 'NO data'}
        </Box>
        {/* pagination in frontend */}
        <div spacing={2} sx={{ marginTop: 5 }} style={divStyle}>
          <Pagination count={data?.totalPages} color="primary" onChange={handlePageChange} />
        </div>
      </Container>
    </Page>
  );
}
