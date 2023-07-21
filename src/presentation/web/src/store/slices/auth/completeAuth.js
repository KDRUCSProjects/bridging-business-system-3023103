import { createSlice } from '@reduxjs/toolkit';


// ----------------------------------------------------------------------

const initialState = {
  Authsteps: {
    activeStep: 0,
  },
};

const completeAuth = createSlice({
  name: 'completeAuth',
  initialState,
  reducers: {


    onBackStep(state) {
      state.Authsteps.activeStep -= 1;
    },

    onNextStep(state) {
      state.Authsteps.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.Authsteps.activeStep = goToStep;
    },

  },
});

// Reducer
export default completeAuth;

// Actions
export const {
  onGotoStep,
  onBackStep,
  onNextStep,
} = completeAuth.actions;

