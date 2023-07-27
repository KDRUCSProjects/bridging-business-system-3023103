const GetAllProducts = {
  query: (path) => ({
    url: path,
  }),
};
const GetSpecificProduct = {
  query: (path) => ({
    url: path,
  }),
};
const SearchProduct = {
  query: (query) => ({
    url: query,
    method: 'GET',
  }),
};

export const ProductQuery = { GetAllProducts, GetSpecificProduct, SearchProduct };
