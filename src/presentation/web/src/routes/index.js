import { Suspense, lazy } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';

// path
import { PATH_PAGE, PATH_AUTH } from './paths';

// components
import LoadingScreen from '../components/LoadingScreen';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const Navigate = useNavigate();
  return useRoutes([
    // User AUTH
    {
      path: '/user',
      children: [
        {
          path: PATH_AUTH.login,
          element: <Login />,
        },
        {
          path: PATH_AUTH.register,
          element: <UserRegister />,
        },
        {
          path: PATH_AUTH.resetPassword,
          element: <ResetPassword />,
        },
        {
          path: PATH_AUTH.adproduct,
          element: <AddProduct />,
        },
        {
          path: PATH_AUTH.checkOut,
          element: <CheckoutPage />,
        },
      ],
    },

    // Home routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: PATH_PAGE.about, element: <About /> },
        { path: PATH_PAGE.contact, element: <Contact /> },
        { path: PATH_PAGE.createProfile, element: <CreateProfile /> },
        { path: PATH_PAGE.businessProfile, element: <BusinessProfile /> },
        { path: PATH_PAGE.updateProfile, element: <UpdateProfile /> },
        { path: PATH_PAGE.payment, element: <PaymentPage /> },
        { path: PATH_PAGE.prodcutdetails, element: <ProductDetails /> },
      ],
    },

    // Not Found
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [{ path: '*', element: <NotFoundPage /> }],
    },
  ]);
}

// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));

// About
const About = Loadable(lazy(() => import('../pages/About')));

// contact us
const Contact = Loadable(lazy(() => import('../pages/Contact')));

// Login
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

// Register
const UserRegister = Loadable(lazy(() => import('../pages/auth/UserRegister')));

// reset Password
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));

// businessProfile
const BusinessProfile = Loadable(lazy(() => import('../pages/profile/BusinessProfile')));

// createProfile
const CreateProfile = Loadable(lazy(() => import('../pages/profile/create/CreateProfile')));

// UpdateProfile
const UpdateProfile = Loadable(lazy(() => import('../pages/profile/update/UpdateProfile')));

// businessProfile
const PaymentPage = Loadable(lazy(() => import('../pages/Payment')));

// adProduct page
const AddProduct = Loadable(lazy(() => import('../pages/product/AdProduct')));

// ProductDetails page
const ProductDetails = Loadable(lazy(() => import('../pages/product/ProductDetails')));

// checkout page
const CheckoutPage = Loadable(lazy(() => import('../pages/checkout/Checkout')));

// Not Found page
const NotFoundPage = Loadable(lazy(() => import('../pages/Page404')));
