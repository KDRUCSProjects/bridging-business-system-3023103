import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, IconButton, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
import cssStyles from '../../utils/cssStyles';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import LightboxModal from '../../components/LightboxModal';
import BaseApi from '../../store/BaseApi';
// ----------------------------------------------------------------------

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
}));

// ----------------------------------------------------------------------

ProfileGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};

export default function ProfileGallery({ gallery , newdata}) {
  // console.log('I am a man',gallery[0].user)
  // const user = gallery[0].user
    // const {data , isError ,isSuccess , isLoading } = BaseApi.useGetAllProductsQuery(`api/product/?user=${gallery[0].user}`);
  const data = newdata.results;
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const imagesLightbox = data.map((item) => item.images[0]?.image);
  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Gallery
      </Typography>

      <Card sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {data.map((item) => (
            <GalleryItem key={item.id} item={item} onOpenLightbox={handleOpenLightbox} />
          ))}
        </Box>

        <LightboxModal
          images={imagesLightbox}
          mainSrc={imagesLightbox[selectedImage]}
          photoIndex={selectedImage}
          setPhotoIndex={setSelectedImage}
          isOpen={openLightbox}
          onCloseRequest={() => setOpenLightbox(false)}
        />
      </Card>
    </Box>
  );
}

// ----------------------------------------------------------------------

GalleryItem.propTypes = {
  image: PropTypes.object,
  onOpenLightbox: PropTypes.func,
};

function GalleryItem({ item, onOpenLightbox }) {
  const { id, images, name } = item;
  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
      <Image alt="gallery image" ratio="1/1" src={images[0]?.image} onClick={() => onOpenLightbox(images[0]?.image)} />

      <CaptionStyle>
        <div>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {"fDate(postAt)"}
          </Typography>
        </div>
        <IconButton color="inherit">
          <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
        </IconButton>
      </CaptionStyle>
    </Card>
  );
}
