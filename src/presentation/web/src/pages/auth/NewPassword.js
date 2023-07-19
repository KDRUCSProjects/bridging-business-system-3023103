// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography, Box ,TextField , Stack } from '@mui/material';
// Lottie
import Lottie from 'react-lottie';
import { FormProvider } from '../../components/hook-form';
// hooks
import useLocales from '../../hooks/useLocales';
import newpassword from '../../animations/auth/newpassword.json';
import animationSetter from '../../animations/animationSetter';
// components
import Page from '../../components/Page';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function NewPassword() {

 const {translate} = useLocales();

  return (
    <Page title="NewPassword Password">
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Box mb={8} textAlign="center" height="300px" width={'500px'}>
            <Lottie options={animationSetter(newpassword)} />
          </Box>
          <Typography mt={-5} variant="h3" paragraph>
           {translate('Enter New Passoword')}
          </Typography>
          <FormProvider>
            <Stack>
                <TextField sx={{marginTop:1 , marginBottom:1}} name='newpassword' type='number' label={'new Password'} />
                <TextField name='confirmpassowrd' type='number' label={'Confirm Password'} />
                <Button sx={{marginTop:1 , marginBottom:1}} type="submit" fullWidth size="large" variant="contained">Confirm</Button>
            </Stack>
          </FormProvider>
        </ContentStyle>
      </Container>
    </Page>
  );
}
