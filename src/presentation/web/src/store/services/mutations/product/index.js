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
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};
const DeleteProduct = {
  query: (query) => ({
    url: query.path,
    method: 'DELETE',
    body: query.data,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};

export const ProductMutations = { CreateProduct, UpdateProduct, DeleteProduct };
