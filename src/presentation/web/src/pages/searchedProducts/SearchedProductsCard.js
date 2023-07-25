import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
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

export default function SearchedProducts() {
  const isDesktop = useResponsive('up', 'md');

  const { cover, title, view, comment, share, author, createdAt } = post;

  return (
    <>
      {isDesktop ? (
        <Card sx={{ height: 250 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={5}>
              <Image
                alt="cover"
                src={'https://imagescdn.dealercarsearch.com/DealerImages/ImageLibrary/1920x800/05b4a5f5.jpg'}
                sx={{ height: 250 }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <PostContent />
            </Grid>
          </Grid>
        </Card>
      ) : (
        <>
          <Card sx={{mb:4}}>
            <Image
              alt="cover"
              src={'https://imagescdn.dealercarsearch.com/DealerImages/ImageLibrary/1920x800/05b4a5f5.jpg'}
              sx={{ height: 250 }}
            />
            <PostContent />
          </Card>
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

export function PostContent({ title, view, comment, share, createdAt }) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <CardContent>
      <Stack mb={2} direction="row" alignItems="center" justifyContent="space-between">
        <Typography gutterBottom variant="h5" component="div">
          {'Bugatti Car'}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {232}
        </Typography>
      </Stack>
      <TextMaxLine variant={'subtitle2'} line={2} persistent>
        {
          'my name is khan laksjdflkasjdflkajsdlfkjaslkdf skd flsadjf lkasjdf lkasjf lkas jflkajsdflkajsdfkljaskldfjalsjdflaksj dflkaj fklsj dfklas jf'
        }
      </TextMaxLine>
      <Stack mt={1} mb={1} direction="row" alignItems="center" spacing={1}>
        <PersonIcon />
        <Typography sx={{ mt: 1, mb: 1, typography: 'caption' }}>{'person posted the product'}</Typography>
      </Stack>

      <Rating name="read-only" size="small" value={4} readOnly />
      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        sx={{
          mt: 3,
          color: 'text.disabled',
        }}
      >
        <ColorPreview colors={['red' , 'blue' , 'black']} />
        {'2022/4/2'}
      </Stack>
    </CardContent>
  );
}
