import { useState } from 'react';
import { Container, Typography, Box, Link, Pagination } from '@mui/material';
import Page from '../../components/Page';
import UserList from '../../sections/@dashboard/e-commerce/product-list/UserList';
import BaseApi from '../../store/BaseApi';
// ----------------------------------------------------------------------

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isSuccess, isError } = BaseApi.useGetAllUsersQuery(`api/business_profile/?page=${currentPage}`);
  const divStyle = { position: 'relative', left: '45%' };
  const userId = localStorage.getItem('userId');
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  return (
    <Page title="Product List">
      <Container sx={{ mt: '7em' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Business Profiles
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
          }}
        >
          {isSuccess
            ? data?.results.map((product) => {
                if (product.user === Number(userId)) {
                  return null;
                }
                return (
                  <>
                    <UserList key={product.id} product={product} />
                  </>
                );
              })
            : null}
        </Box>
        <div spacing={2} style={divStyle}>
          <Pagination count={data?.totalPages} color="primary" onChange={handlePageChange} />
        </div>
      </Container>
    </Page>
  );
}
