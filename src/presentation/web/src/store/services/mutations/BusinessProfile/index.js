// Demo
const CreateProfile = {
  query: (path, body) => ({
    url: path,
    method: 'POST',
    body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }),
};

export const ProfileMutations = { CreateProfile };
