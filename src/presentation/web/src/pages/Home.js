// @mui
import React from 'react';
import Lottie from 'react-lottie';
import { Button, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import animationSetter from '../animations/animationSetter';


import animation from '../animations/shop/cart (2).json';

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
import Snack from '../components/Snack';

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

  const [snackOptions, setSnackOptions] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
    backgroundColor:theme.palette.primary.main,
    color:theme.palette.text.primary,
    animation:<Lottie options={animationSetter(animation)} width='12em' height='4em' />,
    message:'yes this is Dynamic One !',
    animationPosition:{marginLeft:"-4em"}
  });

  const handleSnackClose = () => {
    setSnackOptions({ ...snackOptions, open: false });
  };

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
        <Snack
        vertical={snackOptions.vertical}
        horizontal={snackOptions.horizontal}
        open={snackOptions.open}
        onClose={handleSnackClose}
          message={snackOptions.message}
          animation={snackOptions.animation}
          autoHideDuration={5000}
          backgroundColor={snackOptions.backgroundColor}
          color={snackOptions.color}
          animationPosition={snackOptions.animationPosition}
        />
        <ShopProductList />
      </ContentStyle>
    </Page>
  );
}
