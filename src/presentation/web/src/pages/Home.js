// @mui
import React from 'react';
import { Button, Snackbar, Box } from '@mui/material';

import { styled, useTheme } from '@mui/material/styles';

import animation from '../animations/shared/circulerCycle.json';

// components
import Page from '../components/Page';

// sections
import { categorySlider, TopProductSlider } from '../sections/home';
import ImageSliderSittings from '../sections/home/ImageSlider';

// hooks
import useLocales from '../hooks/useLocales';
import useResponsive from '../hooks/useResponsive';

import CustomSlider from '../components/CustomSlider';
import Cart from '../components/Cart';
import ImageSlider from '../components/ImageSlider';
import Snack from '../components/SnackBar';

// Card
import ShopProductList from '../sections/shop/ShopProductList';

// store

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  marginTop: '4em',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();
  const { translate } = useLocales();
  const isMatchMobile = useResponsive('down', 'sm');

  return (
    <Page title="Ecommerce Start Here">
      <ContentStyle>
        {/* ImageSlider */}
        {isMatchMobile ? null : (
          <ImageSlider
            sliderData={ImageSliderSittings().ImageSliderData}
            settings={ImageSliderSittings().ImageSliderConfig}
          />
        )}
        {/* Category */}
        {isMatchMobile ? null : (
          <CustomSlider
            sliderData={categorySlider().categorySliderData}
            settings={categorySlider().categorySliderConfig}
            title={translate('categories')}
          />
        )}
        {/* Top Product  */}
        {isMatchMobile ? null : (
          <CustomSlider
            sliderData={TopProductSlider().TopProductSliderData}
            settings={TopProductSlider().TopProductSliderConfig}
            title={translate('Top_Product')}
          />
        )}
        <Cart />
        <Snack message={'hi adil'} animation={animation} />
        <ShopProductList />
      </ContentStyle>
    </Page>
  );
}
