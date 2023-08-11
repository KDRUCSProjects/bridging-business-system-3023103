const GetAllOrders = {
  query: (path) => ({
    url: path,
  }),
};
const GetSpecificOrder = {
  query: (path) => ({
    url: path,
  }),
};

export const OrderQuery = { GetAllOrders, GetSpecificOrder };
