import { useTheme } from '@mui/material/styles';

export default function TopProductSlider() {
  const theme = useTheme();
  return {
    TopProductSliderConfig: {
      autoplay: false,
      slidesToShow: 7,
      arrows: false,
      speed: 100,
      centerMode: false,
      centerPadding: '0px',
      rtl: Boolean(theme.direction === 'rtl'),
      responsive: [
        {
          breakpoint: 1279,
          settings: { slidesToShow: 5 },
        },
        {
          breakpoint: 959,
          settings: { slidesToShow: 4 },
        },
        {
          breakpoint: 600,
          settings: { slidesToShow: 4 },
        },
      ],
    },
    TopProductSliderData: [
      {
        title: 'Dress',
        image: 'image',
      },
      {
        title: 'food',
        image: 'image',
      },
      {
        title: 'cars',
        image: 'image',
      },
      {
        title: 'mobiles',
        image: 'image',
      },
      {
        title: 'chairs',
        image: 'image',
      },
      {
        title: 'chairs',
        image: 'image',
      },
      {
        title: 'chairs',
        image: 'image',
      },
      {
        title: 'chairs',
        image: 'image',
      },
      {
        title: 'chairs',
        image: 'image',
      },
      {
        title: 'chairs',
        image: 'image',
      },
      {
        title: 'chairs',
        image: 'image',
      },
      {
        title: 'chairs',
        image: 'image',
      },
    ],
  };
}
