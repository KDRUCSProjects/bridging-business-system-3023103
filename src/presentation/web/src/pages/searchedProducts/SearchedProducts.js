// @mui
import { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Container, Box, Typography, Grid, Stack, TextField, Card, Autocomplete, Rating, Button } from '@mui/material';
// hooks
import FormProvider from '../../components/hook-form/FormProvider';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

import { ColorPreview } from '../../components/color-utils';
// sections
import SearchedProductsCard from './SearchedProductsCard';
import BaseApi from '../../store/BaseApi';
// ----------------------------------------------------------------------
const options = ['Option 1', 'Option 2'];
const optionColor = [
  <ColorPreview colors={['red']} />,
  <ColorPreview colors={['blue']} />,
  <ColorPreview colors={['yellow']} />,
  <ColorPreview colors={['white']} />,
  <ColorPreview colors={['green']} />,
];
const optionPrices = ['1000 - 5000', '5000 - 10000', '10000 - 15000'];

const options1 = [
  <Rating name="read-only" size="small" value={5} readOnly />,
  <Rating name="read-only" size="small" value={4} readOnly />,
  <Rating name="read-only" size="small" value={3} readOnly />,
];

export default function SearchedProducts() {
  const { data, isSuccess } = BaseApi.useGetAllCategoriesQuery('api/category/');
  const { themeStretch } = useSettings();
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const category = data?.map((item) => item.name);
  return (
    <Page title="Searched Products ">
      <Box sx={{ mt: '7em' }}>
        <Container>
          <Typography mb={2} variant="h3">
            Searhced Data
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} mb={3}>
              <FormProvider>
                <Card sx={{ p: 3 }}>
                  <Stack mb={2} spacing={1} direction={'row'}>
                    <FilterListIcon fontSize="large" />
                    <Typography variant="h5"> Filter</Typography>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography mt={1}>Color</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={optionColor}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Colors" />}
                    />
                  </Stack>
                  {isSuccess ? (
                    <Stack spacing={1}>
                      <Typography mt={1}>Category</Typography>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={category}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Category" />}
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
                      disablePortal
                      id="combo-box-demo"
                      options={options1}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Rating" />}
                    />
                  </Stack>
                  <Stack spacing={1}>
                    <Typography mt={1}>Price</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={optionPrices}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Price" />}
                    />
                  </Stack>
                <Button type='submit' fullWidth sx={{mt:2}} color='primary' variant='contained'>Submit</Button>
                </Card>
              </FormProvider>
            </Grid>
            <Grid item xs={12} md={8}>
              <SearchedProductsCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}
