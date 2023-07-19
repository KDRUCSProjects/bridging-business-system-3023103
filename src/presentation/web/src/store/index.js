// mutations
import { ProfileMutations } from './services/mutations/BusinessProfile';
import { ProductMutations } from './services/mutations/product';
import { CartMutations } from './services/mutations/Cart';

// Queries
import { ProfileQueries } from './services/queries/BusinessProfile';
import { ProductQuery } from './services/queries/product';
import { CategoryQuery } from './services/queries/category';
import { UserQuery } from './services/queries/profile';

// Services From Redux Toolkit Query
export const allServices = {
  mutations: { ...ProfileMutations, ...ProductMutations, ...CartMutations },
  queries: { ...ProfileQueries, ...ProductQuery , ...CategoryQuery , ...UserQuery},
};

// Slices From Redux Toolkit
export const allSlices = {};
