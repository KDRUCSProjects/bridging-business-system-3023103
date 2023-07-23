// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

// ----------------------------------------------------------------------

const ROOTS_AUTH = '/user';
const PATH_PAGE_ROOT = '/';

// ----------------------------------------------------------------------
// Auth
export const PATH_AUTH = {
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  adproduct: path(ROOTS_AUTH, '/ad/product'),
  specificProudct: path(ROOTS_AUTH, '/ad/product/:id'),
  checkOut: path(ROOTS_AUTH, '/checkout'),
  registerComplete: path(ROOTS_AUTH, '/complete-register'),
  CompleteForgotPassword: path(ROOTS_AUTH, '/complete-forgotpassword'),
};

// Root Pages
export const PATH_PAGE = {
  about: path(PATH_PAGE_ROOT, 'about-us'),
  contact: path(PATH_PAGE_ROOT, 'contact-us'),
  businessProfile: path(PATH_PAGE_ROOT, 'profile/:id/'),
  createProfile: path(PATH_PAGE_ROOT, 'create/profile'),
  updateProfile: path(PATH_PAGE_ROOT, 'update/profile'),
  payment: path(PATH_PAGE_ROOT, 'payment'),
  prodcutdetails: path(PATH_PAGE_ROOT, `product/details/:id/`),
  invoicecreate: path(PATH_PAGE_ROOT, 'invoice/create'),
  addToCart: path(PATH_PAGE_ROOT, 'addto/cart'),
  ConfirmPassword: path(PATH_PAGE_ROOT, 'confirm/password'),
  NewPassword: path(PATH_PAGE_ROOT, 'new/password'),

  UserProfile: path(PATH_PAGE_ROOT, 'userprofile/:id'),
  notFound: path(PATH_PAGE_ROOT, '404'),
};
