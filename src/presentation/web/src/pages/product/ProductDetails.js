import { useState } from 'react';
import Lottie from 'react-lottie';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// components
import Page from '../../components/Page';

import animationSetter from '../../animations/animationSetter';
import userprofile from '../../animations/profile/user-profile.json';

import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// // sections
import {
  ProductDetailsSummary,
  ProductDetailsCarousel,
} from '../../sections/product-details';

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
 
  const product = {  
      id : "1",
     available : 1,
     colors : [
      "yello",
      "black",
      "red"
     ],
     cover : "",
     inventoryType : "",
     name : "shoe",
     price : 3434,
     sizes : [
      "43",
      "44",
      "42"
     ],
     status : "available",
     totalRating : 4,
     totalReview : 5,
    images : [
      "image1", "image2" , "image3"
    ],
    description: "hello my name is abdul saboor hemat "
  }
  const cart = [
    "one"
  ]

  const [value, setValue] = useState('1');

  return (
    <Page title="Ecommerce: Product Details">
      <Container sx={{marginTop:"6em"}}>
        <HeaderBreadcrumbs
          heading="Product Details"
          links={[
            { name: 'Home' },
          ]}
        />
        {product && (
          <>
            <Card>
              <Grid container sx={{marginBottom:"3em"}}>
                <Grid item xs={12} md={6} lg={7}>
                  <ProductDetailsCarousel product={product} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ProductDetailsSummary
                    product={product}
                    cart={cart}
                  />
                </Grid>
              </Grid>
            </Card>
            <Box sx={{marginTop:"2rem" , marginBottom:"2rem"}}>
              <Card>
                <TabContext value={value}>
                  <Box sx={{ px: 3, bgcolor: 'background.neutral'}}>
                    <TabList onChange={(e, value) => setValue(value)}>
                      <Tab disableRipple value="1" label="Description" />
                    </TabList>
                  </Box>
                  <Divider />
                  <TabPanel value="1">
                    <Box sx={{ p: 3 }}>
                      <Typography>{product.description}</Typography>
                    </Box>
                  </TabPanel>
                </TabContext>
              </Card>
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
}