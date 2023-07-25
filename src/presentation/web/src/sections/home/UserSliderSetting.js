import { useTheme } from '@mui/material/styles';

export default function UserSliderSetting() {
  const theme = useTheme();
  return {
    UserSliderConfig: {
      autoplay: false,
      slidesToShow: 5,
      arrows: false,
      speed: 100,
      centerMode: false,
      centerPadding: '0px',
      rtl: Boolean(theme.direction === 'rtl'),
      responsive: [
        {
          breakpoint: 1279,
          settings: { slidesToShow: 4 },
        },
        {
          breakpoint: 959,
          settings: { slidesToShow: 3 },
        },
        {
          breakpoint: 600,
          settings: { slidesToShow: 4 },
        },
      ],
    },
  };
}
