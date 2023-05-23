import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography } from '@mui/material';

// components
import Image from './Image';
import Iconify from './Iconify';
import { CarouselArrows } from './carousel';
import SocialsButton from './SocialsButton';
import { MotionViewport, varFade } from './animate';

import { _carouselsMembers } from '../@fake-db';

// ----------------------------------------------------------------------

export default function ImageSliderSittings(props) {
  const { sliderData, settings } = props;

  const carouselRef = useRef(null);

  const theme = useTheme();

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>

      <Box sx={{ position: 'relative' , height: "100px" , marginTop: "3em" , marginBottom: "2em" }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
            {sliderData.map((item) => (
              <Box key={item} component={m.div} variants={varFade().in} sx={{ mr: '-2em' }}>
                <MemberCard member={item} />
              </Box>
            ))}
          </Slider>
        </CarouselArrows>
      </Box>
    </Container>
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
  const { title, image } = member;

  return (
    <Box key={title + image} sx={{ px: 0.5, mx: 0.5 }}>
      <Image alt={title + image} src={image} ratio="1/1" sx={{ borderRadius: 1 }} />
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5, color: 'primary.dark', fontSize: '80%' }}>
        {title}
      </Typography>
    </Box>
  );
}
