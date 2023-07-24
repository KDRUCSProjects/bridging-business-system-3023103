import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack ,Rating } from '@mui/material';
// routes
import { fCurrency , fShortenNumber } from '../../utils/formatNumber';
// components
import Image from '../../components/Image';
import { ColorPreview } from '../../components/color-utils';
// utils
// import { , fCurrency } from '../../utils/formatNumber';
// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
export default function ShopProductCard({ product }) {
  const { name , price , color , ratting , quantity, images} = product;
  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
      <Image alt={name} src={images[0]?.image}  ratio="1/1" />
      </Box>
      <Stack spacing={2} sx={{ p: 2 }}>
        <Typography variant="subtitle1" noWrap>
          {name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating size='small' value={ratting} precision={0.1} readOnly />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={color} />
          <Stack direction="row" spacing={0.5}>
            <Typography variant="subtitle2">{fCurrency(price)}</Typography>
          </Stack> 
        </Stack>
      </Stack>
    </Card>
  );
}
