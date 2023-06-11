// mutations
import { ProfileMutations } from './services/mutations/BusinessProfile';
import { CartMutations } from './services/mutations/Cart';

// Queries
import { ProfileQueries } from './services/queries/BusinessProfile';

// Services From Redux Toolkit Query
export const allServices = {
  mutations: { ...ProfileMutations, ...CartMutations },
  queries: { ...ProfileQueries },
};

// Slices From Redux Toolkit
export const allSlices = {};
