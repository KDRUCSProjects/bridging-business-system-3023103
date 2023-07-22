const RegisterUser = {
  query: ( query) => ({
    url: query.path,
    method: 'POST',
    body:query.data,
    shoulFetch:()=>false
  }),
};

 export default RegisterUser;