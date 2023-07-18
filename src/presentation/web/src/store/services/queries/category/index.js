const GetAllCategories = {
    query: (path) => ({
      url: path,
    }),
  };
  const GetSpecificCategory = {
    query: (path) => ({
      url: path,
    }),
  };
  
  export const CategoryQuery = { GetAllCategories, GetSpecificCategory };
  