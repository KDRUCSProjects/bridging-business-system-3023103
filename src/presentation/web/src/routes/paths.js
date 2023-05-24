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
  adproduct: path(ROOTS_AUTH, '/ad/product'),

};

// Root Pages
export const PATH_PAGE = {
  about: path(PATH_PAGE_ROOT, 'about-us'),
  contact: path(PATH_PAGE_ROOT, 'contact-us'),
};
