const VerifyPassword = {
  query: (query) => ({
    url: query.path,
    method: 'POST',
    body: query.data,
  }),
};

export default VerifyPassword;
