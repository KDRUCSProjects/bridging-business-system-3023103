export default function filterObject(datalist, filterOptions) {
  const filtersKeys = [];
  const filteredData = [];

  Object.keys(filterOptions).forEach((filtersKey) => {
    filtersKeys.push(filtersKey);
  });

  datalist.filter((data) => {
    Object.keys(filterOptions).forEach((key) => {
      if (data[key].toLowerCase() === filterOptions[key].toLowerCase()) {
        filteredData.push(data);
        return true;
      }
    });
    return false;
  });
  return filteredData;
}
