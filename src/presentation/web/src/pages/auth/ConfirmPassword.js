
// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography, Box ,TextField , Stack } from '@mui/material';


// Lottie
import Lottie from 'react-lottie';
import { FormProvider } from '../../components/hook-form';
// hooks
import useLocales from '../../hooks/useLocales';


import confirmpasswordanimation from '../../animations/auth/code1.json';
import animationSetter from '../../animations/animationSetter';
// components
import Page from '../../components/Page';
// sections



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

export default function ResetPassword() {

 const {translate} = useLocales();

  return (
    <Page title="Reset Password">
      {/* <LogoOnlyLayout /> */}
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Box mb={8} textAlign="center" height="200px">
            <Lottie options={animationSetter(confirmpasswordanimation)} />
          </Box>
          <Typography mt={-5} variant="h3" paragraph>
           {translate('Enter One Time Passoword')}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            {translate('A one time password has been sent to your Email Address.')}
          
          </Typography>
          {/* <ResetPasswordForm /> */}
          <FormProvider>
            <Stack>
                <TextField name='confirmpassowrd' label={translate('Confirm Password')} />
                <Button sx={{marginTop:1 , marginBottom:1}} type="submit" fullWidth size="large" variant="contained">{translate('Confirm')}</Button>
            </Stack>
          </FormProvider>
          <Button fullWidth size="large" >
            {translate('Resend code')}
        
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
