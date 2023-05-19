import { useTheme } from '@mui/material/styles';



export default function ImageSlider() {
  const theme = useTheme();
  return {
    ImageSliderConfig: {
      autoplay: true,
      slidesToShow: 1,
      arrows: false,
      speed: 100,
      centerMode: false,
      centerPadding: '0px',
      rtl: Boolean(theme.direction === 'rtl'),
      responsive: [
        {
          breakpoint: 1279,
          settings: { slidesToShow: 1 },
        },
        {
          breakpoint: 959,
          settings: { slidesToShow: 1 },
        },
        {
          breakpoint: 600,
          settings: { slidesToShow: 1 },
        },
      ],
    },
    ImageSliderData: [
      {
        image: '../../images/first.jpg',
      },
      {
        image: '../../images/second.jpg',
      },
      {
        image: '../../images/third.jpg',
      },
    ],
  };
}
