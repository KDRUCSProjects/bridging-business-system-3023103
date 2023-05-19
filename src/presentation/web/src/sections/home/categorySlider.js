import { useTheme } from '@mui/material/styles';

export default function CategorySlider() {
  const theme = useTheme();
  return {
    categorySliderConfig: {
      autoplay: false,
      slidesToShow: 10,
      arrows: false,
      speed: 100,
      centerMode: false,
      centerPadding: '0px',
      rtl: Boolean(theme.direction === 'rtl'),
      responsive: [
        {
          breakpoint: 1279,
          settings: { slidesToShow: 8 },
        },
        {
          breakpoint: 959,
          settings: { slidesToShow: 7 },
        },
        {
          breakpoint: 600,
          settings: { slidesToShow: 6 },
        },
      ],
    },
    categorySliderData: [
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
