// Demo
const CreateProfile = {
  query: (query) => ({
    url: query.path,
    method: 'POST',
    body:query.data,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};

export const ProfileMutations = { CreateProfile };
