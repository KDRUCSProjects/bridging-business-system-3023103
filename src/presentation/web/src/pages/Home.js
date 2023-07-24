import React, { useState } from 'react';
// @mui
import Lottie from 'react-lottie';
import { styled } from '@mui/material';
import animationSetter from '../animations/animationSetter';
import animation from '../animations/shop/cart (2).json';
// components
import Page from '../components/Page';
// sections
import { categorySlider } from '../sections/home';
import ImageSliderSittings from '../sections/home/ImageSlider';
import TopProductSliderSettings from '../sections/home/TopProductSliderSettings';
// hooks
import useLocales from '../hooks/useLocales';
import useResponsive from '../hooks/useResponsive';
import CustomSlider from '../components/CustomSlider';
import Cart from '../components/Cart';
import ImageSlider from '../components/ImageSlider';
import TopProductSlider from '../components/TopProductSlider';
import Snack from '../components/Snack';
// Card
import ShopProductList from '../sections/shop/ShopProductList';
// store
import BaseApi from '../store/BaseApi';

// ----------------------------------------------------------------------
const ContentStyle = styled('div')(({ theme }) => ({
  marginTop: '4em',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  const { isSuccess, data, isError, isLoading } = BaseApi.useGetAllCategoriesQuery('api/category/');
  const { data: advertisements, isSuccess: advertisementIsSuccess } =
    BaseApi.useGetAllAdvertismentsQuery('api/advertisments/');

  const sliderData = data?.map((item) => ({
    title: item.name,
    image: item.image,
  }));
  const { translate } = useLocales();
  const isMatchMobile = useResponsive('down', 'sm');
  return isSuccess ? (
    <Page title="Ecommerce Start Here">
      <ContentStyle>
        {/* ImageSlider */}
        {!isMatchMobile && advertisementIsSuccess ? (
          <ImageSlider sliderData={advertisements} settings={ImageSliderSittings().ImageSliderConfig} />
        ) : null}
        {/* Category */}
        {isMatchMobile ? null : (
          <CustomSlider
            sliderData={sliderData}
            settings={categorySlider().categorySliderConfig}
            title={translate('categories')}
          />
        )}
        {/* Top Product  */}
        {isMatchMobile ? null : (
          <TopProductSlider
            settings={TopProductSliderSettings().TopProductSliderConfig}
            title={translate('Top_Product')}
          />
        )}

        <Cart />
        <ShopProductList />
      </ContentStyle>
    </Page>
  ) : (
    'Data Not Found'
  );
}
