import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Link } from '@mui/material';

// components
import Image from './Image';
import { CarouselArrows } from './carousel';
import { MotionViewport, varFade } from './animate';

import { _carouselsMembers } from '../@fake-db';
import BaseApi from '../store/BaseApi';

// ----------------------------------------------------------------------

export default function TopProductSlider(props) {
  const { isSuccess, data, isError, isLoading } = BaseApi.useGetAllProductsQuery('api/product/');
  const { settings, title } = props;

  if (isError) {
    <h1>Error </h1>;
  } else if (isLoading) {
    <h1>Loading</h1>;
  }
  const carouselRef = useRef(null);

  const theme = useTheme();

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return isSuccess ? (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inRight}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'start' }}>
          {title}
        </Typography>
      </m.div>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
            {data.results.map((item) => (
              <Link href={`/product/details/${item.id}/`} style={{ textDecoration: 'none' }}>
                <MemberCard member={item} />
              </Link>
            ))}
          </Slider>
        </CarouselArrows>
      </Box>
    </Container>
  ) : (
    'Data Not Found'
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

function MemberCard({ member }) {
  const { name, images } = member;
  return (
    <Box key={name + images} sx={{ px: 0.5, mx: 0.5 }}>
      <Image alt={name + images} src={images[0]?.image} ratio="1/1" sx={{ borderRadius: 1 }} />
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5, color: 'primary.dark', fontSize: '80%' }}>
        {name}
      </Typography>
    </Box>
  );
}
