const GetAllRattings = {
  query: (path) => ({
    url: path,
  }),
};
const GetSpecificRatting = {
  query: (path) => ({
    url: path,
  }),
};

export const RattingQuery = { GetAllRattings, GetSpecificRatting };
