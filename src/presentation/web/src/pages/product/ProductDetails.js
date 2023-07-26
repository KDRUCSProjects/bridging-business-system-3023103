import { useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { useParams } from 'react-router';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';

// // sections
import ProductDetailsCarousel from '../../sections/product-details/ProductDetailsCarousel';
import ProductDetailsSummary from '../../sections/product-details/ProductDetailsSummary';
import BaseApi from '../../store/BaseApi';
// // ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

export default function ProductDetails() {
  const { id } = useParams();
  const { isSuccess, data, isError, isLoading } = BaseApi.useGetSpecificProductQuery(`api/product/${id}`);

  const { translate } = useLocales();
  const cart = ['one'];

  const [value, setValue] = useState('1');

  return isSuccess ? (
    <Page title="Product Details">
      <Container sx={{ marginTop: '6em' }}>
        <Typography variant={'h3'} gutterBottom>
          {' '}
          {translate('product details')}{' '}
        </Typography>
        {data && (
          <>
            <Card>
              <Grid container sx={{ marginBottom: '3em' }}>
                <Grid item xs={12} md={6} lg={7}>
                  <ProductDetailsCarousel product={data} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ProductDetailsSummary product={data} cart={cart} />
                </Grid>
              </Grid>
            </Card>
            <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
              <Card>
                <TabContext value={value}>
                  <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                    <TabList onChange={(e, value) => setValue(value)}>
                      <Tab disableRipple value="1" label={translate('discription')} />
                    </TabList>
                  </Box>
                  <Divider />
                  <TabPanel value="1">
                    <Box sx={{ p: 3 }}>
                      <div dangerouslySetInnerHTML={{ __html: data.description }} />
                    </Box>
                  </TabPanel>
                </TabContext>
              </Card>
            </Box>
          </>
        )}
      </Container>
    </Page>
  ) : (
    'No Data Found'
  );
}
