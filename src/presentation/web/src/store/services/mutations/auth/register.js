const RegisterUser = {
  query: (query) => ({
    url: query.path,
    method: 'POST',
    body: query.data,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
};

export default RegisterUser;
