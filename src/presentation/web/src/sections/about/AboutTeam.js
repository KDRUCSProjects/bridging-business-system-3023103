import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography } from '@mui/material';

// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { CarouselArrows } from '../../components/carousel';
import SocialsButton from '../../components/SocialsButton';
import { MotionViewport, varFade } from '../../components/animate';

import { _carouselsMembers } from '../../@fake-db';

// images
import khalidAhmad from '../../assets/team/Khalid Ahmad.jpg';
import Safiullah from '../../assets/team/Safiullah.jpg';
import Abdulwahab from '../../assets/team/wahab.jpeg';
import AbdulSaboor from '../../assets/team/abdulsaboor.jpg';
import MohammadHaroon from '../../assets/team/Haroon.jpeg';

// ----------------------------------------------------------------------

const Team = [
  {
    name: 'Abdul Wahab Adil',
    avatar: Abdulwahab,
    role: 'Full Stack Developer',
    link: {
      facebook: 'https://www.facebook.com/search/top/?q=Wahab%20Adil',
      linkedIn: 'https://af.linkedin.com/in/wahab-adil-81b3b2256',
      github: 'https://github.com/Wahab-Adil',
      soloLearn: 'https://www.sololearn.com/profile/15871215',
    },
  },
  {
    name: 'Khalid Ahamd Mubariz',
    avatar: khalidAhmad,
    role: 'BackendEnd Developer',
    link: {
      facebook: 'https://www.facebook.com/khaled.mabaraze?mibextid=ZbWKwL',
      linkedIn: 'https://www.linkedin.com/in/khalid-ahmad-mubariz-aa6514237',
      github: 'https://github.com/KhalidMubaraze',
      soloLearn: '',
    },
  },
  {
    name: 'Safiullah Jalalzai',
    avatar: Safiullah,
    role: 'BackendEnd Developer',
    link: {
      facebook: '',
      linkedIn: '',
      github: '',
      soloLearn: '',
    },
  },
  {
    name: 'Mohammad Haroon Khoshal',
    avatar: MohammadHaroon,
    role: 'FrontEnd Developer',
    link: {
      facebook: 'https://www.facebook.com/mohammadharoon.jalal.56?mibextid=ZbWKwL',
      linkedIn: 'https://www.linkedin.com/in/mohammad-haroon-khoshal-24b847237',
      github: 'https://github.com/Haroon500?tab=followers',
      soloLearn: 'https://sololearn.onelink.me/MfgO/htl0b86t',
    },
  },
  {
    name: 'Abdul Saboor Hemat',
    avatar: AbdulSaboor,
    role: 'FrontEnd Developer',
    link: {
      facebook: '',
      linkedIn: '',
      github: '',
      soloLearn: '',
    },
  },
];

export default function AboutTeam() {
  const carouselRef = useRef(null);

  const theme = useTheme();

  const settings = {
    arrows: false,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          Dream team
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Great team is the key
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 630,
            color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
          }}
        >
          AfghanTeam will provide you support if you have any problems, our support team will reply within a day and we
          also have Best Services for you
        </Typography>
      </m.div>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
            {Team.map((member) => (
              <Box key={member.id} component={m.div} variants={varFade().in} sx={{ px: 1.5, py: 10 }}>
                <MemberCard member={member} link={member.link} />
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

function MemberCard({ member, link }) {
  const { name, role, avatar } = member;

  return (
    <Card key={name} sx={{ p: 1 }}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>
      <Image alt={name} src={avatar} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      <Stack alignItems="center" sx={{ mt: 2, mb: 1 }}>
        <SocialsButton sx={{ color: 'action.active' }} links={link} />
      </Stack>
    </Card>
  );
}
