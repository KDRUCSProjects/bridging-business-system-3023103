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
        image: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
      },
      {
        image: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
      {
        image: 'https://www.accesseye.com/wp-content/uploads/2022/12/Image.png',
      },
    ],
  };
}
