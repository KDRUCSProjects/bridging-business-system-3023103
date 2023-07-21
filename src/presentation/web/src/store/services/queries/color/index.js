const GetAllColors = {
  query: (path) => ({
    url: path,
  }),
};
const GetSpecificColor = {
  query: (path) => ({
    url: path,
  }),
};

export const ColorQuery = { GetAllColors, GetSpecificColor };
