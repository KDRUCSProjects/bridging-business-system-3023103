import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Pagination,
  TextField,
  Stack,
  Autocomplete,
  Card,
  Button,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Page from '../../components/Page';

import FormProvider from '../../components/hook-form/FormProvider';
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

  const BusinessNames = ['Khalid', 'saboor'];
  return (
    <Page title="Product List">
      <Container sx={{ mt: '7em' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Business Profiles
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} mb={2}>
            <FormProvider>
              <Card sx={{ p: 3 }}>
                <Stack mb={2} spacing={1} direction={'row'}>
                  <FilterListIcon fontSize="large" />
                  <Typography variant="h5"> Filter</Typography>
                </Stack>
                <Stack sx={{}}>
                  <Typography mt={2}>Business Name</Typography>
                  <Autocomplete
                    fullWidth
                    disablePortal
                    id="BusinessName"
                    options={BusinessNames}
                    // onChange={(e, value) => {
                    //   handeAutocompletValue('color', value.id);
                    // }}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label={'Business Name'} />}
                  />
                </Stack>
                <Stack>
                  <Typography mt={2}>Business Type</Typography>
                  <Autocomplete
                    disablePortal
                    id="BusinessType"
                    options={BusinessNames}
                    // onChange={(e, value) => {
                    //   handeAutocompletValue('color', value.id);
                    // }}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label={'Business Type'} />}
                  />
                </Stack>
                <Button type="submit" fullWidth sx={{ mt: 2 }} color="primary" variant="contained">
                  Submit
                </Button>
              </Card>
            </FormProvider>
          </Grid>
          <Grid item xs={12} md={9}>
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
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
