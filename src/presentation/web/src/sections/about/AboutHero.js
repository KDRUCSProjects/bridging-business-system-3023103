import { m } from 'framer-motion';

// @mui
import { styled  , useTheme} from '@mui/material/styles';
import { Box, Container, Typography  , Grid , useMediaQuery} from '@mui/material';
// ----------------------------------------------------------------------
// lottie
import Lottie from 'react-lottie';
// animtion
import welcome from '../../animations/about/welcome.json'

// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';


// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  boxSizing:"border-box",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    marginTop:"5em",
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({

  textAlign: 'center',  
  [theme.breakpoints.up('md')]: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  const theme = useTheme()
  const isMatchSM= useMediaQuery(theme.breakpoints.up('sm'));
  const isMatchSMDown= useMediaQuery(theme.breakpoints.down('sm'));

  // lottie configration
  const welcomeAnimationConfig = {
    loop: true,
    autoplay: true,
    animationData: welcome,
  };
  return (
    <RootStyle >
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle >
          <Grid item conatiner flexDirection='cloumn'>

          <TextAnimate text="Who" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
          <br />
          <Box sx={{ display: 'inline-flex', color: 'common.white'  }}>
            <TextAnimate text="we" sx={{ mr: 2 }} />
            <TextAnimate text="are?" />
          </Box>
            <m.div variants={varFade().inRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.white',
                fontWeight: 'fontWeightMedium',
              }}
            >
               We are Afghan shopper and seller
              <br /> join with use for better Working
            </Typography>
            
          </m.div>
        
          </Grid>
          <Grid item  conatiner justifyContent={isMatchSMDown ? 'center' :"undefiend"} >
            <Lottie options={welcomeAnimationConfig}  width={'400px'}  height={'400px'}/>

          </Grid>

        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
