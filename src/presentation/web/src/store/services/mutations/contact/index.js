export const CreateContactMessage = {
  query: (query) => ({
    url: query.path,
    method: 'POST',
    body: query.data,
    formData: true,
  }),
};
