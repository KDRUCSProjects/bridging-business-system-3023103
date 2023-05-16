import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;



  const logo = (
    <Box sx={{ width: 100, height: 100, ...sx }}>

<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="100%" height="100%" viewBox="0 0 512 512"
 preserveAspectRatio="xMidYMid meet">
     <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>


<g transform="translate(0.000000,433.000000) scale(0.100000,-0.100000)"
fill={PRIMARY_MAIN} stroke="none">
<path d="M2405 3313 c11 -78 33 -137 75 -197 22 -32 40 -59 40 -61 0 -3 -40
-5 -90 -5 -49 0 -90 -4 -90 -8 0 -32 118 -165 175 -198 19 -10 19 -12 0 -65
-19 -51 -20 -88 -23 -673 l-3 -619 68 6 c87 8 166 32 221 66 100 61 169 120
218 189 122 169 153 379 84 565 -25 68 -102 197 -174 292 -82 109 -106 163
-106 237 0 51 6 73 30 115 42 74 119 123 195 126 24 1 42 3 41 4 -4 4 -657
273 -663 273 -2 0 -1 -21 2 -47z"/>
<path d="M2914 2916 c-39 -33 -39 -89 0 -122 57 -50 138 -14 138 61 0 75 -81
111 -138 61z"/>
</g>
</svg>

    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
