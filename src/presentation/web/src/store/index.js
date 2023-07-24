// mutations
import { ProfileMutations } from './services/mutations/BusinessProfile';
import { ProductMutations } from './services/mutations/product';
import { CartMutations } from './services/mutations/Cart';
import RegisterUser from './services/mutations/auth/register';
import VerifyUser from './services/mutations/auth/verify';
import ForgotPasswordEmail from './services/mutations/auth/forgotPassword/forgotPassword-Email';
import NewPassword from './services/mutations/auth/forgotPassword/newPassword';
import VerifyPassword from './services/mutations/auth/forgotPassword/verifyPassword';
import LoginUser from './services/mutations/auth/login';
import Resetpassword from './services/mutations/auth/resetPassword';
import LogoutUser from './services/mutations/auth/logout';

// Queries
import { ProfileQueries } from './services/queries/BusinessProfile';
import { ProductQuery } from './services/queries/product';
import { CategoryQuery } from './services/queries/category';
import { UserQuery } from './services/queries/profile';
import { ColorQuery } from './services/queries/color';
import { AdvetismentQuery } from './services/queries/advertisement';

// Services From Redux Toolkit Query
export const allServices = {
  queries: { ...ProfileQueries, ...ProductQuery, ...CategoryQuery, ...UserQuery, ...ColorQuery, ...AdvetismentQuery },
  mutations: {
    ...ProfileMutations,
    ...ProductMutations,
    ...CartMutations,
    RegisterUser,
    VerifyUser,
    ForgotPasswordEmail,
    NewPassword,
    VerifyPassword,
    LoginUser,
    Resetpassword,
    LogoutUser,
  },
};

export const allSlices = {};
