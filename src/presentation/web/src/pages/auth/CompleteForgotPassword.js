import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector } from '@mui/material';

import Lottie from 'react-lottie';
import animationSetter from '../../animations/animationSetter';
import animation from '../../animations/shared/arrow-right.json';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';

// redux
import { useDispatch, useSelector } from '../../store/store';

// sections
import { ForgotPasswordEmail, ForgotPasswordVerify, ConfirmPassword, Login } from '.';

// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};
const STEPS = [
  'Email',
  'verify Password',
  'new Password',
  <Lottie options={animationSetter(animation)} width={'100px'} height={'50px'} />,
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 20,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Iconify icon={'eva:checkmark-fill'} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}

export default function CompleteForgotPassword() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { Authsteps } = useSelector((store) => store.completeAuth);
  const { activeStep } = Authsteps;
  const isComplete = 3;

  return (
    <Page title="Afghan Business:ForgotPassword">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled',
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
        {activeStep === 0 && <ForgotPasswordEmail />}
        {activeStep === 1 && <ForgotPasswordVerify />}
        {activeStep === 2 && <ConfirmPassword />}
        {activeStep === 3 && <Login />}
      </Container>
    </Page>
  );
}
