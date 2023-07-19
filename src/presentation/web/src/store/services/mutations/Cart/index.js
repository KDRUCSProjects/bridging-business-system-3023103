const AddToCartService = {
  query: (query) => ({
    url: query.path,
    method: 'POST',
    body: query.data
  }),
};

export const CartMutations = { AddToCartService };
