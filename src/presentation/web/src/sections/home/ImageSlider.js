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
        image: 'https://m.media-amazon.com/images/G/31/img22/Beauty/aman/SSD/Bodywash-Fest_1400x800._SX900_QL85_.jpg',
      },
      {
        image:
          'https://m.media-amazon.com/images/G/31/img22/Beauty/aman/april/265-23_MON_Ecom_banner_-_33_off_1400_X_800_1._SX900_QL85_.jpg',
      },
      {
        image:
          'https://i0.wp.com/www.snowdropsolution.com/wp-content/uploads/2022/05/Creative-Advertisement-Which-Product-Categories-Are-Best-Suited-To-Creative-Advertising-And-Which-Type-Of-Creativity-Have-The-Most-Influence.jpg?fit=1920%2C1080&ssl=1',
      },
      {
        image:
          'https://www.marketing91.com/wp-content/uploads/2020/06/COKE-Advertising-Example-Share-a-Coke-Campaign.jpg',
      },
      {
        image: 'https://swagdrop.com/wp-content/uploads/2021/12/Business-advertising-products-image.png',
      },
      {
        image: 'https://i.ytimg.com/vi/80_tu354ezs/maxresdefault.jpg',
      },
    ],
  };
}
