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

export const ProductQueries = { GetAllProducts, GetSpecificProduct };
