import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
  const [topProduct, setTopproduct] = useState([]);
  const { settings, title, data, isSuccess } = props;
  useEffect(() => {
    const sorted = [...data].sort((a, b) => b.ratting - a.ratting);
    setTopproduct(sorted);
  }, []);
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
            {topProduct.map((item) => (
              <Link key={item.id + item.name} href={`/product/details/${item.id}/`} style={{ textDecoration: 'none' }}>
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
  const img = `http://127.0.0.1:8002${images[0]?.image}`;
  return (
    <Box key={name + images} sx={{ px: 0.5, mx: 0.5 }}>
      <Image alt={name + images} src={img} ratio="1/1" sx={{ borderRadius: 1 }} />
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5, color: 'primary.dark', fontSize: '80%' }}>
        {name}
      </Typography>
    </Box>
  );
}
