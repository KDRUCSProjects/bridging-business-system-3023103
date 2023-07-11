// mutations
import { ProfileMutations } from './services/mutations/BusinessProfile';
import { ProductMutations } from './services/mutations/product';
import { CartMutations } from './services/mutations/Cart';

// Queries
import { ProfileQueries } from './services/queries/BusinessProfile';
import { ProductQuery } from './services/queries/product';

// Services From Redux Toolkit Query
export const allServices = {
  mutations: { ...ProfileMutations, ...ProductMutations, ...CartMutations },
  queries: { ...ProfileQueries, ...ProductQuery },
};

// Slices From Redux Toolkit
export const allSlices = {};
