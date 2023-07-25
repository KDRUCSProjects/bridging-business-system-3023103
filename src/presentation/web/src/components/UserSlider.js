import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Link, Button, Stack, Card } from '@mui/material';

// components
import Image from './Image';
import { CarouselArrows } from './carousel';
import { MotionViewport, varFade } from './animate';

import { _carouselsMembers } from '../@fake-db';
import BaseApi from '../store/BaseApi';

// ----------------------------------------------------------------------

export default function TopProductSlider(props) {
  const { isSuccess, data, isError, isLoading } = BaseApi.useGetAllUsersQuery('api/business_profile/');
  const { settings, title } = props;
  const userId = localStorage.getItem('userId');
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
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'start' }}>
          {title}
        </Typography>
        <Link href="users" variant="h6">
          View All
        </Link>
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
            {data.map((profile) => {
              if (profile.user === Number(userId)) {
                return null;
              }
              return (
                <>
                  <MemberCard linkto={`/userprofile/${profile.user}/`} member={profile} />
                </>
              );
            })}
          </Slider>
        </CarouselArrows>
      </Box>

      <Button href={'/users'} sx={{ mt: 1 }}>
        View Profile
      </Button>
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

function MemberCard({ member, linkto }) {
  const { businessName, avator } = member;
  return (
    <Card sx={{ ml: 0.5 }}>
      <Box sx={{ position: 'relative' }}>
        <Image alt={businessName + avator} src={avator} ratio="1/1" />
      </Box>
      <Stack spacing={1} sx={{ mt: 1, mb: 1 }}>
        <Typography variant="subtitle1" noWrap>
          {businessName}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button href={linkto} variant="outlined" fullWidth>
            View Profile
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
