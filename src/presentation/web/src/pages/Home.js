// @mui
import { styled, useTheme } from '@mui/material/styles';
// components
import Page from '../components/Page';

// sections
import { categorySlider, TopProductSlider } from '../sections/home';

// hooks
import useResponsive from '../hooks/useResponsive';

import CustomSlider from '../components/CustomSlider';

// Card
import ShopProductList from '../sections/shop/ShopProductList';

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

  const isMatchMobile = useResponsive('down', 'sm');

  return (
    <Page title="Ecommerce Start Here">
      <ContentStyle>
        {/* Category */}
        {isMatchMobile ? null : (
          <CustomSlider
            sliderData={categorySlider().categorySliderData}
            settings={categorySlider().categorySliderConfig}
            title={'categories'}
          />
        )}

        {/* Top Product  */}
        {isMatchMobile ? null : (
          <CustomSlider
            sliderData={TopProductSlider().TopProductSliderData}
            settings={TopProductSlider().TopProductSliderConfig}
            title={'Top Product'}
          />
        )}

        <ShopProductList />
      </ContentStyle>
    </Page>
  );
}
