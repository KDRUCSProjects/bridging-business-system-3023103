const LogoutUser = {
  query: (query) => ({
    url: query.path,
    method: 'POST',
    headers: { Authorization: `Token ${query.token}` },
  }),
};

export default LogoutUser;
