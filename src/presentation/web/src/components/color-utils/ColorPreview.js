import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const IconStyle = styled('div')(({ theme }) => ({
  marginLeft: -4,
  borderRadius: '50%',
  width: theme.spacing(2),
  height: theme.spacing(2),
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
}));

// ----------------------------------------------------------------------

export default function ColorPreview({ colors, sx }) {
  return (
    <RootStyle component="span" sx={sx}>
      {colors.map((color, index) => (
        <IconStyle key={color + index} sx={{ bgcolor: color.name }} />
      ))}
    </RootStyle>
  );
}
