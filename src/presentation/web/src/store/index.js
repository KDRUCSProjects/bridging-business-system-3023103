// mutations
import { ProfileMutations } from './services/mutations/BusinessProfile';
import { ProductMutations } from './services/mutations/product';
import { CategoryMutations } from './services/mutations/category';
import { CartMutations } from './services/mutations/Cart';

// Queries
import { ProfileQueries } from './services/queries/BusinessProfile';
import { ProductQueries } from './services/queries/product';
import { CategoryQueries } from './services/queries/category';

// Services From Redux Toolkit Query
export const allServices = {
  mutations: { ...ProfileMutations, ...ProductMutations, ...CartMutations, ...CategoryMutations },
  queries: { ...ProfileQueries, ...ProductQueries, ...CategoryQueries },
};

// Slices From Redux Toolkit
export const allSlices = {};
