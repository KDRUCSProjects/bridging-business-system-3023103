import { createSlice } from '@reduxjs/toolkit';


// ----------------------------------------------------------------------

const initialState = {
  ForgotSteps: {
    activeStep: 0,
  },
};

const CompleteForgotPassword = createSlice({
  name: 'completeAuth',
  initialState,
  reducers: {


    onBackStep(state) {
      state.ForgotSteps.activeStep -= 1;
    },

    onNextStep(state) {
      state.ForgotSteps.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.ForgotSteps.activeStep = goToStep;
    },

  },
});

// Reducer
export default CompleteForgotPassword;

// Actions
export const {
  onGotoStep,
  onBackStep,
  onNextStep,
} = CompleteForgotPassword.actions;

