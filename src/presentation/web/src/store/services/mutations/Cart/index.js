const AddToCartService = {
  query: (Cart) => ({
    url: '/auth/demo',
    method: 'POST',
    body: Cart,
  }),
};

export const CartMutations = { AddToCartService };
