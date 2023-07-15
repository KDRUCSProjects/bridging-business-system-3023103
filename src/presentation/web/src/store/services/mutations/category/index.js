const CreateCategory = {
  query: (path, body) => ({
    url: path,
    method: 'POST',
    body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};

const UpdateCategory = {
  query: (path, body) => ({
    url: path,
    method: 'PUT',
    body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};
const DeleteCategory = {
  query: (path, body) => ({
    url: path,
    method: 'DELETE',
    body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};

export const CategoryMutations = { CreateCategory, UpdateCategory, DeleteCategory };
