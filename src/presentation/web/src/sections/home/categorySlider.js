import { useTheme } from '@mui/material/styles';

export default function CategorySlider() {
  const theme = useTheme();
  return {
    categorySliderConfig: {
      autoplay: false,
      slidesToShow: 12,
      arrows: false,
      speed: 100,
      centerMode: false,
      centerPadding: '0px',
      rtl: Boolean(theme.direction === 'rtl'),
      responsive: [
        {
          breakpoint: 1279,
          settings: { slidesToShow: 10 },
        },
        {
          breakpoint: 959,
          settings: { slidesToShow: 8 },
        },
        {
          breakpoint: 600,
          settings: { slidesToShow: 6 },
        },
      ],
    },
  };
}
