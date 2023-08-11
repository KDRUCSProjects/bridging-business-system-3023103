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
  welcomepage: path(ROOTS_AUTH, '/welcomepage'),
};

// Root Pages
export const PATH_PAGE = {
  about: path(PATH_PAGE_ROOT, 'about-us'),
  contact: path(PATH_PAGE_ROOT, 'contact-us'),
  businessProfile: path(PATH_PAGE_ROOT, 'profile/:id/'),
  createProfile: path(PATH_PAGE_ROOT, 'create/profile'),
  updateProfile: path(PATH_PAGE_ROOT, 'update/profile'),
  prodcutdetails: path(PATH_PAGE_ROOT, `product/details/:id/`),
  addToCart: path(PATH_PAGE_ROOT, 'addto/cart'),
  UserProfile: path(PATH_PAGE_ROOT, 'userprofile/:id'),
  Users: path(PATH_PAGE_ROOT, 'users'),
  SearchedProducts: path(PATH_PAGE_ROOT, 'searched/products/'),
  SearchedProductsByName: path(PATH_PAGE_ROOT, 'searched/products/:productName'),

  // welcomepage: path(PATH_PAGE_ROOT, 'welcomepage'),
  notFound: path(PATH_PAGE_ROOT, '404'),
};
