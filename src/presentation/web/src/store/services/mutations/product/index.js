const CreateProduct = {
  query: ( query) => ({
    url: query.path,
    method: 'POST',
    body:query.data,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};

const UpdateProduct = {
  query: (path, body) => ({
    url: path,
    method: 'PUT',
    body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};
const DeleteProduct = {
  query: (path, body) => ({
    url: path,
    method: 'DELETE',
    body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};

export const ProductMutations = { CreateProduct, UpdateProduct, DeleteProduct };
