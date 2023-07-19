const GetAllUsers = {
    query: (path) => ({
      url: path,
    }),
  };
  const GetSpecificUser = {
    query: (path) => ({
      url: path,
    }),
  };
  
  export const UserQuery = { GetAllUsers, GetSpecificUser };
  