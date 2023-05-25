import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography, Box } from '@mui/material';

// Lottie
import Lottie from 'react-lottie';
import resetPasswordAnimation from '../../animations/auth/resetPassword/sailing-boat.json';
import animationSetter from '../../animations/animationSetter';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';

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
  return (
    <Page title="Reset Password">
      <LogoOnlyLayout />
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Box mt={-8} textAlign="center" height="300px">
            <Lottie options={animationSetter(resetPasswordAnimation)} />
          </Box>
          <Typography mt={-5} variant="h3" paragraph>
            Forgot your password?
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Please enter the email address associated with your account and We will email you a link to reset your
            password.
          </Typography>
          <ResetPasswordForm />
          <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login}>
            Back
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
