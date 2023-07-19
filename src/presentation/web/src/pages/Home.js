import React ,{ useState } from 'react';
// @mui
import Lottie from 'react-lottie';
import {styled} from '@mui/material';
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
  const { isSuccess,data , isError ,isLoading} = BaseApi.useGetAllCategoriesQuery('api/category/');
  const sliderData = data?.map((item)=>(
    {
      title : item.name ,
      image : item.image
    }
  ))  

  const [nweImage , setnewImage]= useState('')
  const handleimage = (e) =>{
    e.preventDefault();
    setnewImage(e.target.files);
  }
 
  const { translate } = useLocales();
  const isMatchMobile = useResponsive('down', 'sm');
  const [snackOptions, setSnackOptions] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
    animation:<Lottie options={animationSetter(animation)} width='12em' height='4em' />,
    message:'yes this is Dynamic One !',
    animationPosition:{marginLeft:"-4em"}
  });

  const handleSnackClose = () => {
    setSnackOptions({ ...snackOptions, open: false });
  };

  return (
    (isSuccess?
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
    </Page>:"Data Not Found")
  );
}
