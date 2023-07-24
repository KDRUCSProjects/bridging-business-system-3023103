const Resetpassword = {
  query: (query) => ({
    url: query.path,
    method: 'POST',
    body: query.data,
  }),
};

export default Resetpassword;
