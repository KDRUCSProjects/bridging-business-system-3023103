import { Typography, Card, CardContent, Stack, Button } from '@mui/material';
import useResponsive from '../../../../hooks/useResponsive';

// components
import Image from '../../../../components/Image';
import TextMaxLine from '../../../../components/TextMaxLine';
// ----------------------------------------------------------------------

export default function ProductTableRow(product) {
  return (
    <Card sx={{ mb: 4 }}>
      <Image alt="cover" src={product?.product.avator} sx={{ height: 240 }} />
      <PostContent product={product} />
    </Card>
  );
}

export function PostContent({ product }) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <CardContent>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography gutterBottom variant="h6" component="div">
          {product.product.businessName}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography sx={{ typography: 'caption' }}>Type: {product.product.business_type}</Typography>
      </Stack>
      <TextMaxLine variant={'subtitle2'} line={1} persistent>
        {product.product.address.province}
      </TextMaxLine>
      <Button href={`/userprofile/${product.product.user}/`} sx={{ mt: 2 }} fullWidth variant="outlined">
        View Profile
      </Button>
    </CardContent>
  );
}
