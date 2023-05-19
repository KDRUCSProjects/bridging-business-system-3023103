// @mui
import { styled, useTheme } from '@mui/material/styles';
// components
import Page from '../components/Page';

// sections
import { categorySlider, TopProductSlider } from '../sections/home';
import ImageSliderSittings from '../sections/home/ImageSlider';

// hooks
import useResponsive from '../hooks/useResponsive';

import CustomSlider from '../components/CustomSlider';
import ImageSlider from '../components/ImageSlider';

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
      </ContentStyle>
    </Page>
  );
}
