// Demo
const CreateProfile = {
  query: (query) => ({
    url: query.path,
    method: 'POST',
    body: query.data,
    formData: true,
  }),
};
const UpdateProfile = {
  query: (query) => ({
    url: query.path,
    method: 'PUT',
    body: query.data,
    formData: true,
  }),
};

export const ProfileMutations = { CreateProfile, UpdateProfile };
