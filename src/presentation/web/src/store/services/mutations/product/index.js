const CreateProduct = {
  query: (query) => ({
    url: query.path,
    method: 'POST',
    body: query.data,
    formData: true,
  }),
};

const UpdateProduct = {
  query: (query) => ({
    url: query.path,
    method: 'PUT',
    body: query.data,
    formData: true,
    // headers: {
    //   'Content-type': 'application/json; charset=UTF-8',
    // },
  }),
};
const DeleteProduct = {
  query: (query) => ({
    url: query,
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};

export const ProductMutations = { CreateProduct, UpdateProduct, DeleteProduct };
