// @mui
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Container,
  Box,
  Typography,
  Grid,
  Stack,
  TextField,
  Card,
  Autocomplete,
  Rating,
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
// formik and yup
import { dispatch } from '../../store/store';
import RHFSelect from '../../components/hook-form/RHFSelect';

// hooks
import useLocales from '../../hooks/useLocales';
import FormProvider from '../../components/hook-form/FormProvider';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

import { productActions } from '../../store/slices/product/product';
import { ColorPreview } from '../../components/color-utils';
// sections
import SearchedProductsCard from './SearchedProductsCard';
import BaseApi from '../../store/BaseApi';
// ----------------------------------------------------------------------

const options = [
  <Rating name="read-only" size="small" value={5} readOnly />,
  <Rating name="read-only" size="small" value={4} readOnly />,
  <Rating name="read-only" size="small" value={3} readOnly />,
];

export default function SearchedProducts() {
  const [input, setInput] = useState([]);
  const { translate } = useLocales();
  const searchValue = useSelector((store) => store.products.searchedValue);
  const filterVlaues = useSelector((store) => store.products.filterValues);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [productSearchSuccess, setProductSearchSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8002/api/product/?search=${searchValue}`)
      .then((res) => {
        setSearchedProducts(res.data);
        setProductSearchSuccess(true);
      })
      .catch((err) => {});
  }, [searchValue]);
  const { data: categories, isSuccess } = BaseApi.useGetAllCategoriesQuery('api/category/');
  const { themeStretch } = useSettings();

  const handeAutocompletValue = (name, id) => {
    setInput({ ...input, [name]: id });
  };
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    axios
      .get(
        `http://127.0.0.1:8002/api/product/?user=&category=${input.category ? input.category : ''}&color=${
          input.color ? input.color : ''
        }&price__gt=${input.maxPrice ? input.maxPrice : ''}&price__lt=${
          input.minPrice ? input.minPrice : ''
        }&search=${searchValue}`
      )
      .then((response) => {
        setSearchedProducts(response.data);
      });
  };
  return (
    <Page title="Searched Products ">
      <Box sx={{ mt: '7em' }}>
        <Container>
          <Typography mb={2} variant="h3">
            Searhced Data
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} mb={3}>
              <FormProvider onSubmit={handlesubmit}>
                <Card sx={{ p: 3 }}>
                  <Stack mb={2} spacing={1} direction={'row'}>
                    <FilterListIcon fontSize="large" />
                    <Typography variant="h5"> Filter</Typography>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography mt={1}>Color</Typography>
                    <Autocomplete
                      disablePortal
                      id="color"
                      options={categories || 'No data'}
                      onChange={(e, value) => {
                        handeAutocompletValue('color', value.id);
                      }}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => <TextField {...params} label={'color'} />}
                    />
                  </Stack>
                  {isSuccess ? (
                    <Stack spacing={1}>
                      <Typography mt={1}>Category</Typography>
                      <Autocomplete
                        disablePortal
                        id="category"
                        options={categories || 'No data'}
                        onChange={(e, value) => {
                          handeAutocompletValue('category', value.id);
                        }}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField {...params} label={'category'} />}
                      />
                    </Stack>
                  ) : (
                    <Stack spacing={1}>
                      <Typography mt={1}>Category</Typography>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={['No Category']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                      />
                    </Stack>
                  )}
                  <Stack spacing={1}>
                    <Typography mt={1}>Rating</Typography>
                    <Autocomplete
                      onChange={handleInputChange}
                      name="rating"
                      disablePortal
                      id="combo-box-demo"
                      options={options}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Rating" />}
                    />
                  </Stack>
                  <Stack spacing={1}>
                    <Typography mt={1}>Price</Typography>
                    <TextField
                      onChange={handleInputChange}
                      name="maxPrice"
                      sx={{ width: '100px' }}
                      type="number"
                      placeholder="min price"
                      size={'small'}
                    />
                    <TextField
                      onChange={handleInputChange}
                      name="minPrice"
                      sx={{ width: '100px' }}
                      type="number"
                      placeholder="max price"
                      size={'small'}
                    />
                  </Stack>
                  <Button type="submit" fullWidth sx={{ mt: 2 }} color="primary" variant="contained">
                    Submit
                  </Button>
                </Card>
              </FormProvider>
            </Grid>
            <Grid item xs={12} md={8}>
              <SearchedProductsCard searchProducts={productSearchSuccess ? searchedProducts : []} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}
