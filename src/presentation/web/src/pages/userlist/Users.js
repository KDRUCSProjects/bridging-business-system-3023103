import { useEffect, useState } from 'react';
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
import axios from 'axios';
import FilterListIcon from '@mui/icons-material/FilterList';
import Page from '../../components/Page';

import FormProvider from '../../components/hook-form/FormProvider';
import UserList from '../../sections/@dashboard/e-commerce/product-list/UserList';
import BaseApi from '../../store/BaseApi';
// ----------------------------------------------------------------------

export default function Users() {
  const [searchValue, setSearchValue] = useState({
    businessName: '',
    businessType: '',
  });
  const [searchedData, setSearchData] = useState();
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState({
    businessName: '',
    businessType: '',
  });
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/business_profile/?search=${searchValue.businessName}&business_type=${searchValue.businessType}&page=${currentPage}`
      )
      .then((res) => {
        setSearchData(res.data);
        setSearchSuccess(true);
      })
      .catch((err) => {});
  }, [currentPage, searchValue]);
  const divStyle = { position: 'relative', left: '45%' };
  const userId = localStorage.getItem('userId');
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const resetForm = () => {
    setInput({
      businessName: '',
      businessType: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchValue({
      businessName: input.businessName,
      businessType: input.businessType,
    });
    resetForm();
  };

  return (
    <Page title="Product List">
      <Container sx={{ mt: '7em' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Business Profiles
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} mb={2}>
            <FormProvider onSubmit={handleSubmit}>
              <Card sx={{ p: 3 }}>
                <Stack mb={2} spacing={1} direction={'row'}>
                  <FilterListIcon fontSize="large" />
                  <Typography variant="h5"> Filter</Typography>
                </Stack>
                <Stack sx={{}}>
                  <Typography mt={2}>Business Name</Typography>
                  <TextField
                    fullWidth
                    value={input.businessName}
                    onChange={handleInputChange}
                    name="businessName"
                    placeholder="Business Name"
                  />
                </Stack>
                <Stack>
                  <Typography mt={2}>Business Type</Typography>
                  <TextField
                    value={input.businessType}
                    fullWidth
                    onChange={handleInputChange}
                    name="businessType"
                    placeholder="Business Type"
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
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
              }}
            >
              {searchSuccess
                ? searchedData?.results.map((product) => {
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
              <Pagination count={searchedData?.totalPages} color="primary" onChange={handlePageChange} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
