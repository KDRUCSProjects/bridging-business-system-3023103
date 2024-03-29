import React, { useState } from 'react';
// @mui
import { styled } from '@mui/material';

// components

import { useSelector } from 'react-redux';
import Page from '../components/Page';
// sections
import { categorySlider } from '../sections/home';
import ImageSliderSittings from '../sections/home/ImageSlider';
import TopProductSliderSettings from '../sections/home/TopProductSliderSettings';
import UserSliderSetting from '../sections/home/UserSliderSetting';

// hooks
import useLocales from '../hooks/useLocales';
import useResponsive from '../hooks/useResponsive';
import CustomSlider from '../components/CustomSlider';
import Cart from '../components/Cart';
import ImageSlider from '../components/ImageSlider';
import TopProductSlider from '../components/TopProductSlider';
import UserSlider from '../components/UserSlider';
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
  const { isSuccess: topProductIsSeccess, data: topProduct } =
    BaseApi.useGetAllProductsQuery('/api/ratting/top_product/');

  const sliderData = data?.map((item) => ({
    title: item.name,
    image: item.image,
  }));
  const { translate } = useLocales();
  const isMatchMobile = useResponsive('down', 'sm');
  const isLogged = useSelector((store) => store.islogged.isLogged);

  if (isLogged) {
    window.location.reload();
  }
  // const onChat = () => {
  //   const data = {
  //     firtanme: 'adiljan',
  //     lastname: 'adil',
  //     email: 'adil@gmail.com',
  //     password: 'helmand',
  //     confirmPassword: 'helmand',
  //     image: 'hem',
  //   };
  //   const result = axios.post('http://localhost:8002', data).then((res) => res.data);
  //   console.log(result);
  // };
  return isSuccess ? (
    <Page title="Briging Businesses">
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
        {!isMatchMobile && topProductIsSeccess ? (
          <TopProductSlider
            settings={TopProductSliderSettings().TopProductSliderConfig}
            title={translate('Top_Product')}
            data={topProduct}
            isSuccess={topProductIsSeccess}
          />
        ) : null}
        {/* User Slider  */}
        {isMatchMobile ? null : (
          <UserSlider settings={UserSliderSetting().UserSliderConfig} title={translate('Businesses')} />
        )}

        <Cart />
        <ShopProductList title={translate('New Arrivals')} />
      </ContentStyle>
    </Page>
  ) : (
    'Data Not Found'
  );
}
