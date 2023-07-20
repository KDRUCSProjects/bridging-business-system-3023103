// mutations
import { ProfileMutations } from './services/mutations/BusinessProfile';
import { ProductMutations } from './services/mutations/product';
import { CartMutations } from './services/mutations/Cart';
import RegisterUser from './services/mutations/auth/register';
// Queries
import { ProfileQueries } from './services/queries/BusinessProfile';
import { ProductQuery } from './services/queries/product';
import { CategoryQuery } from './services/queries/category';
import { UserQuery } from './services/queries/profile';

// Services From Redux Toolkit Query
export const allServices = {
  queries: { ...ProfileQueries, ...ProductQuery , ...CategoryQuery , ...UserQuery},
  mutations: { ...ProfileMutations, ...ProductMutations, ...CartMutations, RegisterUser },
};

export const allSlices = {};
