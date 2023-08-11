import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from 'react-redux';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Card, Avatar, Typography, CardContent, Stack, Rating, Grid } from '@mui/material';

import useResponsive from '../../hooks/useResponsive';
// utils
import { ColorPreview } from '../../components/color-utils';
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import TextMaxLine from '../../components/TextMaxLine';
import TextIconLabel from '../../components/TextIconLabel';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

SearchedProducts.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

const post = {
  cover: 'cover',
  title: 'title ',
  view: 3400,
  comment: 12000,
  share: 1200,
  author: 'saboor',
  createdAt: '123',
};

export default function SearchedProducts({ searchProducts }) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <>
      {isDesktop ? (
        <>
          {searchProducts.results?.map((product) => {
            return (
              <Card sx={{ height: 250, marginBottom: '2em' }}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={5}>
                    <Image alt="cover" src={product.images[0].image} sx={{ height: 250 }} />
                  </Grid>
                  <Grid item xs={12} md={7} py={2}>
                    <PostContent productContent={product} />
                  </Grid>
                </Grid>
              </Card>
            );
          })}
        </>
      ) : (
        <>
          {searchProducts.results?.map((product) => {
            return (
              <>
                <Card sx={{ mb: 4 }}>
                  <Image alt="cover" src={product.images[0].image} sx={{ height: 250 }} />
                  <PostContent productContent={product} />
                </Card>
              </>
            );
          })}
        </>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  comment: PropTypes.number,
  createdAt: PropTypes.string,
  share: PropTypes.number,
  title: PropTypes.string,
  view: PropTypes.number,
};

export function PostContent({ productContent }) {
  const { name, quantity, ratting, description, price, created_at: created, color, is_sold: sold } = productContent;
  const isDesktop = useResponsive('up', 'md');
  console.log(productContent);
  return (
    <CardContent>
      <Stack mb={1} direction="row" alignItems="center" justifyContent="space-between">
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {price} AF
        </Typography>
      </Stack>
      <TextMaxLine variant={'subtitle2'} line={2} persistent>
        {description}
      </TextMaxLine>
      <Stack mt={1} mb={1} direction="row" alignItems="center" spacing={1}>
        <PersonIcon />
        <Typography sx={{ mt: 1, mb: 1, typography: 'caption' }}>{created}</Typography>
      </Stack>
      <Stack>
        <Rating name="read-only" size="small" value={ratting} readOnly />

        <Typography sx={{ color: !sold ? 'primary.main' : 'error.main', fontWeight: 'bold' }}>
          {!sold ? 'In stack' : 'sold'}
        </Typography>
      </Stack>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        sx={{
          mt: 1,
          color: 'text.disabled',
        }}
      >
        <ColorPreview colors={color} />({quantity})items
      </Stack>
    </CardContent>
  );
}
